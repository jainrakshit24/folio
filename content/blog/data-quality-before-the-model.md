---
title: "Your AI Project Will Fail on Data Quality, Not on the Model"
description: "Leading zeros destroyed by a cast. Four date formats in one column. The word null stored as text. The model is rarely the thing that went wrong."
slug: "data-quality-before-the-model"
category: "Data Engineering"
tags:
  - data quality checks
  - data cleaning
  - ETL validation
  - machine learning data preparation
  - SQL data profiling
author: "Rakshit Jain"
publishedAt: "2026-11-21"
updatedAt: ""
cover: ""
published: true
featured: false
---

Most of what gets called a machine learning problem is a data problem wearing a better job title. The model is usually fine. The column feeding it has four date formats, a hundred rows where someone typed `n/a`, and a store code that lost its leading zero somewhere in a cast three systems upstream.

Here are the failures I keep finding, in the order they usually appear.

## Silent nulls

A column is 2% null according to the database. It's actually 8% missing, because somebody's export writes `n/a`, `null`, `NULL`, `-` and an empty string, and only one of those is a real null.

```sql
SELECT amount, COUNT(*)
FROM orders
WHERE amount IN ('n/a', 'null', 'NULL', '-', '', 'NA', 'None')
GROUP BY amount;
```

Run that against any column you inherited. The first time it returns rows is memorable.

The damage is downstream. Average ignores nulls and happily includes the string `'n/a'` cast to zero, if the pipeline was lenient about types. Now the mean is wrong by exactly the amount nobody's looking at.

## Leading zeros

A store code like `04512` is text. Somewhere between the export and the warehouse, something helpfully casts it to an integer, and now it's `4512`. It joins to nothing. The rows don't error, they just stop matching, and the report quietly covers fewer stores than it claims to.

The tell is a column where every value is numeric, a meaningful share start with zero, and it's used in a join. If all three are true, it's an identifier and it should never have been a number.

## Mixed date formats in one column

`2026-03-04` and `04/03/2026` in the same field. Ninety percent of rows parse one way, the rest the other, and the parser doesn't complain, it just reads the minority as a different month.

This one is nasty because the result is plausible. You don't get an error. You get a seasonality pattern that's not real.

## The type that's only mostly a type

A quantity column where 70% of present values parse as numbers. The other 30% are `"2 boxes"`, `"approx 15"`, `"?"`. Every aggregate over that column is computed on a subset nobody defined.

## Duplicate keys that aren't quite duplicates

`order_id` looks like a primary key. Seventy rows repeat a value that already exists. Sometimes it's a genuine duplicate load. Sometimes the key is only unique *per region* and nobody wrote that down. Those two need opposite fixes, and telling them apart requires asking a person, not running a query.

## What to do before the model

A short list that catches most of it:

1. Profile every column, type, null rate, distinct count, min and max
2. Grep for placeholder strings before trusting any null rate
3. Check that anything used in a join is stored as text if it could have leading zeros
4. Count distinct date formats, don't assume one
5. Test the primary key claim instead of accepting it
6. Write down what each column means, where it came from, and who owns it

Step six is the one that gets skipped and the one that compounds. A column definition written once saves the same investigation being run four times by four people.

## The rule I won't bend

If a check couldn't run, it's unverified, it's not a pass.

I built a profiling skill around exactly this, and the hardest part wasn't the statistics. It was refusing to let a score be reported as confirmed when every threshold behind it was inferred rather than agreed with the business. The score says provisional, and it keeps saying provisional until someone writes the rules down.

An agent will give you a confident paragraph either way. That's the problem with asking one whether your data is clean. It answers the question it can answer, in the tone of the question you asked.

## Where this leaves the model

Give a competent gradient boosting model clean, well-defined, correctly typed features and it'll do something reasonable. Give it the table described above and it'll learn the artefacts, the missingness pattern, the cast that dropped zeros, the region that silently fell out in August.

It will score well in validation, because the validation set has the same artefacts. Then it'll meet production.

---

**Sources**

- [Data Quality Fundamentals, Great Expectations docs](https://docs.greatexpectations.io/)
- [From ETL to Autonomy: Data Engineering in 2026, The New Stack](https://thenewstack.io/from-etl-to-autonomy-data-engineering-in-2026/)
- [Where Data Engineering Is Heading in 2026, Joe Reis](https://joereis.substack.com/p/where-data-engineering-is-heading)
