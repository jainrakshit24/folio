---
title: "The Lakehouse Won, and the Survey Numbers Say It Is Only Half Done"
description: "Iceberg is the centre of gravity and DuckDB keeps turning up as the engine. But 44% of teams are still on a cloud warehouse, and that gap is the real story of 2026."
slug: "lakehouse-is-the-default-now"
category: "Data Engineering"
tags:
  - data lakehouse
  - Apache Iceberg
  - DuckDB
  - lakehouse vs data warehouse
  - data engineering 2026
author: "Rakshit Jain"
publishedAt: "2026-11-21"
updatedAt: ""
cover: ""
published: true
featured: false
---

Every vendor blog this year has told you the lakehouse won. The survey data says something more useful and less tidy.

A February 2026 survey of 1,101 data professionals put cloud warehouses at roughly **44%** and lakehouse architectures at roughly **27%**. That's a significant foothold. It's not a takeover. If you're building a data platform right now, you're building into a split market, and that changes which decisions you can safely defer.

## What actually settled

Three things look decided.

**Apache Iceberg is the table format.** Not Delta, not Hudi, not a tie. Databricks acquiring Tabular in 2024 consolidated control over the format, and the system followed. Amazon S3 Tables added support for all Iceberg V3 data types on 30 September 2026. When the storage layer of a hyperscaler grows native support for your table format, the argument is over.

**The engine is no longer the architecture.** The common shape now is open table format in cloud object storage, with whatever compute makes sense on top, Spark, Trino, Snowflake's Iceberg support, DuckDB. Swapping the engine stopped being a migration.

**DuckDB stopped being a toy.** It shows up in production paths it had no business being in two years ago. Single-node, embedded, no cluster to babysit, and for a very large share of real analytical queries it's simply faster than spinning up distributed compute.

## What didn't settle

The 44% isn't inertia. Teams on Snowflake or BigQuery with working governance, working access control and a finance team that understands the bill aren't obviously wrong to stay.

The honest version of the lakehouse pitch is that you trade an operational problem for an engineering one. You stop paying for a vendor's compute coupling, and you start owning catalog management, file compaction, and metadata hygiene yourself.

Compaction is the one that bites. Streaming small files into Iceberg without a compaction strategy produces a table that gets slower every week, and the symptom arrives months after the decision.

## Where this leaves a practical stack

If I were starting a platform today:

```text
storage    S3 / GCS / ADLS, Iceberg tables
catalog    one, chosen deliberately, not three by accident
compute    DuckDB for anything single-node
           Trino or Spark when it genuinely does not fit
orchestr.  whatever the team already runs well
```

That last line matters more than it reads. The orchestration layer is where most data platforms actually fail, and it fails for organisational reasons rather than technical ones.

## The part nobody writes blog posts about

Two other themes keep surfacing in the 2026 commentary: agentic AI inside pipelines, and FinOps for data platforms. One forecast expects data engineers to offload key tasks to AI agents.

I would hold that one loosely. An agent that can write a transformation is useful. An agent that can tell you whether the transformation is *correct* needs the thing most platforms don't have, a definition of correct that lives somewhere other than in a senior engineer's head.

That's the unglamorous work. Data contracts, validation at the boundary, a written definition of what each column means. It doesn't trend. It's also the only thing that makes the automation safe.

## A test worth running

Take one table in your warehouse and ask three questions:

1. If the upstream schema changed tomorrow, what breaks, and would anything alert?
2. Is there a written definition of every column, outside of someone's memory?
3. Can you reproduce last month's numbers exactly?

If the answers are "unknown", "no" and "probably not", the table format isn't your problem. Migrating it to Iceberg will give you the same uncertainty in a more fashionable file layout.

---

**Sources**

- [Where Data Engineering Is Heading in 2026, Joe Reis](https://joereis.substack.com/p/where-data-engineering-is-heading)
- [Practical Data Engineering Survey, Joe Reis](https://joereis.github.io/practical_data_data_eng_survey)
- [From ETL to Autonomy: Data Engineering in 2026, The New Stack](https://thenewstack.io/from-etl-to-autonomy-data-engineering-in-2026/)
- [Apache Iceberg and the Open Data Stack, DEV](https://dev.to/dataformathub/apache-iceberg-the-open-data-stack-why-the-lakehouse-is-real-in-2026-2218)
- [10 Predictions for Data Infrastructure in 2026, Columnar](https://columnar.tech/blog/2026-predictions/)
- [Top trends in big data for enterprises in 2026, TechTarget](https://www.techtarget.com/data-technologies/feature/Top-trends-in-big-data-for-enterprises-in-2026)
