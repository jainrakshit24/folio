---
title: "How to Prove Two Systems Hold the Same Data"
description: "Row counts match and the data is still wrong. The reconciliation ladder I use on every release: counts, aggregates, hashes, then the keys that differ."
slug: "prove-two-systems-hold-same-data"
category: "Data Engineering"
tags:
  - ETL data reconciliation
  - source to target testing
  - SQL data validation
  - ETL testing
  - data quality checks
author: "Rakshit Jain"
publishedAt: "2026-11-23"
updatedAt: ""
cover: ""
published: true
featured: false
---

Someone moves data from A to B and tells me it worked. My job is to find out whether that's true before a client does.

I've run this before every release for about a year now, and I'd rather find the problem myself than hear about it. It's four steps, each one catching what the last one missed, and I keep them in this order because each step costs more than the one before it.

## Step 1: I count the rows

This is the cheapest check I've, and it catches the loudest failures.

```sql
SELECT 'source' AS side, COUNT(*) FROM source.orders
WHERE loaded_on = '2026-11-23'
UNION ALL
SELECT 'target', COUNT(*) FROM warehouse.orders
WHERE loaded_on = '2026-11-23';
```

There are two rules here I won't bend, because I've been burned by both.

**I filter both sides the same way.** If you compare an unfiltered source count against a target filtered to today's load, this check will lie to you. You'll chase a gap that isn't there, lose an afternoon, and the pipeline was fine the whole time.

**I explain every gap rather than tolerate it.** "Close enough" is how a 0.3% drop quietly becomes permanent. If 40 rows are missing, I want to know whether they were rejected, deduplicated or dropped, because those are three different bugs.

## Step 2: I aggregate the numbers

Counts match. Now I check whether the values survived the trip.

```sql
SELECT
  COUNT(*)        AS rows,
  SUM(amount)     AS total,
  MIN(amount)     AS lo,
  MAX(amount)     AS hi,
  COUNT(DISTINCT customer_id) AS customers
FROM warehouse.orders
WHERE loaded_on = '2026-11-23';
```

Run the same thing on the source and put them side by side.

`MIN` and `MAX` earn their place here. A truncated decimal, a currency nobody converted, a cast that clipped values, they all move the extremes before they shift the sum enough for you to notice.

`COUNT(DISTINCT customer_id)` catches the join that quietly fanned out. Your row count still matches, because the duplicates filled in for rows dropped somewhere else. The sum is wrong, and the distinct count is what tells you why.

## Step 3: I hash the rows

Counts match. Aggregates match. Your data can still be wrong, because an aggregate is a summary, and summaries hide things.

I've seen two rows swap their `status` values and produce an identical count and an identical sum.

```sql
SELECT MD5(STRING_AGG(row_hash, '' ORDER BY order_id))
FROM (
  SELECT order_id,
         MD5(CONCAT_WS('|',
           order_id, customer_id, status,
           CAST(amount AS CHAR), order_date
         )) AS row_hash
  FROM warehouse.orders
  WHERE loaded_on = '2026-11-23'
) t;
```

Same query on both sides. You get one string each. If they match, every column you listed is identical in every row.

**Use `CONCAT_WS` with a separator, not plain concatenation.** Without it, `('ab','c')` and `('a','bc')` hash identically, and you've built a check that only ever agrees with itself.

**Don't skip the `ORDER BY`.** Without it you're hashing whatever order the engine felt like handing back, so the check fails at random, which is worse than not having it at all.

## Step 4: I find the keys that differ

A hash mismatch tells me something's wrong. It doesn't tell me what. This is where I'm willing to spend the expensive query.

```sql
-- in source, not in target
SELECT order_id FROM source.orders
EXCEPT
SELECT order_id FROM warehouse.orders;

-- present in both, different content
SELECT s.order_id, s.status, t.status, s.amount, t.amount
FROM source.orders s
JOIN warehouse.orders t USING (order_id)
WHERE s.status <> t.status
   OR s.amount <> t.amount;
```

Run `EXCEPT` in both directions. Missing rows and extra rows are different bugs, and they usually have different causes.

## The two mistakes I keep running into

**Stopping at step one.** Row counts are the check everyone runs, and they're the weakest rung on the ladder. I've lost count of how often they match while the data underneath is wrong.

**Fixing it with a direct UPDATE.** When reconciliation finds a mismatch, writing straight to the table to correct it skips the exact validation layer you were testing. The number looks right afterwards and you've proven nothing about the pipeline. Fix it upstream, rerun the load, reconcile again.

## I don't run these by hand

All four steps are plain SQL, so they can run on every load instead of whenever someone remembers. I wire them into CI and let the job fail on a mismatch.

I don't think the tooling's the point. What matters is that a check you only run when you're already worried is a check that runs after the client has called you.

---

**Sources**

- [Reconciliation checks - Alation docs](https://docs.alation.com/en/latest/steward/AlationDataQuality/ManageChecks/ReconciliationChecks.html)
- [Data reconciliation - Fivetran](https://www.fivetran.com/learn/data-reconciliation)
- [Verifying data integrity after ETL - Zilliz](https://zilliz.com/ai-faq/how-do-you-verify-the-integrity-of-data-after-etl-completion.md)
- [Snowflake Data Validation CLI](https://docs.snowflake.com/en/migrations/snowconvert-docs/data-validation-cli/CLI_USAGE_GUIDE)
- [ETL testing guide - Talend](https://www.talend.com/resources/etl-testing)
