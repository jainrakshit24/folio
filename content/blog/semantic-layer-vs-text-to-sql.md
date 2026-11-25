---
title: "Your Text-to-SQL Bot Is Wrong a Third of the Time and Sounds Certain Anyway"
description: "dbt reran its 2023 benchmark on 2026 models. Text-to-SQL accuracy nearly doubled and still landed at 64.5%. The number that matters is not the accuracy, it is what each approach does when it fails."
slug: "semantic-layer-vs-text-to-sql"
category: "Data Engineering"
tags:
  - semantic layer vs text-to-SQL
  - dbt Semantic Layer
  - text-to-SQL accuracy
  - LLM data analytics
  - AI SQL agent
author: "Rakshit Jain"
publishedAt: "2026-11-27"
updatedAt: ""
cover: ""
published: true
featured: true
---

In 2023, somebody pointed GPT-4 at a normalised insurance schema and asked it eleven business questions. It got 32.7% of them right.

Everyone agreed this was early days. The models would improve. They did improve. dbt reran the same benchmark this year on Sonnet 4.6 and GPT-5.3 Codex, and text-to-SQL came in at **64.5%**.

Accuracy almost exactly doubled in under three years. That is a real achievement and it is also the problem, because 64.5% is not a number you can put in front of a board.

## What was actually measured

The ACME Insurance benchmark, originally built by Juan Sequeda and others at data.world. Fifteen tables in third normal form. Eleven questions, each run twenty times, which is 220 runs per configuration. That repetition matters, because a model that gets a question right once and wrong nineteen times is not a model that answers the question.

Four setups were compared. Text-to-SQL with the full schema in context. A minimal dbt semantic layer sitting on the raw normalised tables. A properly modelled semantic layer. And text-to-SQL again, given the new models as context.

Here is the 2023 to 2026 comparison.

| Question type | T2S 2023 | T2S 2026 | SL 2023 | SL 2026 |
|---|---|---|---|---|
| In semantic layer scope | 26.9% | 62.5% / 51.2% | 83.1% | 100% / 100% |
| Out of scope | 48.3% | 70.0% / 100% | 0.0% | 0.0% |
| All eleven | 32.7% | 64.5% | 60.5% | 72.7% |

The 2026 pairs are Sonnet 4.6 and GPT-5.3 Codex. Both landed on 64.5% overall by different routes, which is a coincidence worth noticing and not over-reading.

Two rows jump out and they point in opposite directions.

In scope, the semantic layer was correct on every single run. Not 97%, not 99.4%. Both models, 220 runs each, 100%.

Out of scope, it scored zero. Twice.

## The zero is the interesting number

That zero is not a failure to answer correctly. It is a refusal to answer at all.

Those questions needed more entity hops than the semantic layer was modelled to traverse. So it said it could not do it. Text-to-SQL, handed the same questions, scored 70% and 100%, because it will always write some SQL and sometimes the SQL is right.

Put those two behaviours side by side and the whole argument changes.

**The semantic layer fails by refusing. Text-to-SQL fails by returning a plausible wrong number.**

A refusal costs you an afternoon. Somebody has to go model the thing properly, or write the query by hand, and they are mildly annoyed. A confident wrong number costs you a decision, and you do not find out for a quarter.

The academic paired benchmark on the same suite says this in almost the same words. Semantic layer errors are refusals. Text-to-SQL errors are confident wrong answers.

Thirty-five percent of the time, in a scenario where the whole schema was handed over on a plate, the bot made something up that looked like an answer. Nobody is checking it. That is the entire point of self-serve analytics.

## The part both camps skip

Then dbt did something smarter than the rest of the benchmark. They asked an LLM to write as few new dbt models as possible to cover all eleven questions. It produced **three**. No human wrote any of the code.

| Model | Method | Accuracy |
|---|---|---|
| Sonnet 4.6 | Text-to-SQL | 90.0% |
| Sonnet 4.6 | Semantic Layer | 98.2% |
| GPT-5.3 Codex | Text-to-SQL | 84.1% |
| GPT-5.3 Codex | Semantic Layer | 100% |

Text-to-SQL went from 64.5% to around 87%. The semantic layer went from 72.7% to effectively perfect, and the zeroes disappeared because it could now reach those entities.

Three models. Both approaches improved sharply.

This is the finding people are going to scroll past on their way to the vendor argument, and it is the only one with a clear instruction attached. **The modelling was doing the work, not the interface.** Everyone wants to debate whether you need a semantic layer. The benchmark says that what you actually need is for your warehouse to not be fifteen normalised tables that only one person understands, and once that is fixed, both approaches get good.

If your tables are a mess, no interface saves you. That is the same argument I made about [getting the data right before the model](/blog/data-quality-before-the-model), and it keeps being true in new costumes.

## A finding that will save you money

Reasoning effort barely moved the numbers.

GPT at `xhigh` averaged over twenty seconds per query. The same model at `high` averaged about eight. The accuracy difference was not meaningful. On the Anthropic side, changing reasoning effort changed neither the results nor the latency.

More interesting: Opus 4.6 had the *lowest* semantic layer accuracy of the models tested, between 87.2% and 87.5%. Sonnet 4.6 beat it. The expensive model was not the better model for this job.

If you are routing analytics queries through your most expensive tier at maximum reasoning because it feels safer, this benchmark says you are paying roughly triple the latency for nothing. Structured retrieval over a well-defined layer is not the kind of task that rewards more thinking.

## What I do not trust about this

dbt ran this benchmark. dbt sells a semantic layer. That does not make the numbers wrong, and they published the methodology and the raw conditions, which is more than most vendor benchmarks do. But it shapes which comparisons got run.

Three specific gaps.

Text-to-SQL was given the full fifteen-table schema in context. dbt flags this themselves as impractical at real scale, which cuts both ways. Real deployments cannot do this, so production text-to-SQL is probably worse than 64.5%. But it also means text-to-SQL was never tested with good retrieval over the schema, which is how a serious team would actually build it.

Nobody compared a compiled semantic layer against an equally rich hand-written context document on the same questions. That is the comparison I would most like to see and it does not exist.

The post never states how many of the eleven questions were in scope versus out. Without that split you cannot reconstruct the overall figures or weight them yourself.

One more thing worth flagging. A team at bodo.ai reported 100% accuracy across the same 220 runs using a different pipeline called PyDough, scored with dbt's own comparator. That is a vendor blog claiming a perfect score on a rival's benchmark, so treat it as a claim rather than a result until someone independent reproduces it.

## Where this leaves you

For anything that has to be right, configure the semantic layer. Board numbers, anything an auditor reads, KPIs, the weekly report people make decisions from. You are buying the refusal, not the accuracy. You want a system that says "I cannot answer that" rather than one that guesses with conviction.

For exploration, check whether the semantic layer covers it first. If it does not, look at whether a small modelling change would close the gap, because the benchmark suggests three models was enough to close a very large one. Fall back to text-to-SQL with as much schema context as you can afford, and treat every answer as a draft.

And stop treating this as a choice between two products. The benchmark's own best result came from doing the boring modelling work, after which both approaches were fine. There is no version of this where the warehouse stays a mess and the interface rescues you.

If you are still deciding what that warehouse should look like underneath, I wrote about [why the lakehouse became the default](/blog/lakehouse-is-the-default-now).

---

**Sources**

- [Semantic Layer vs. Text-to-SQL: 2026 Benchmark Update](https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026), dbt Labs, April 2026. Every accuracy figure above comes from here.
- Ganz and Perigaud, [Semantic Layers for Reliable LLM-Powered Data Analytics](https://arxiv.org/pdf/2604.25149), arXiv 2026. Independent paired benchmark on the same suite, and the source of the refusal versus confident-error framing.
- [How PyDough Reached 100% Accuracy on dbt's Semantic Layer Benchmark](https://www.bodo.ai/blog/how-pydough-reached-100-accuracy-on-dbts-semantic-layer-benchmark), bodo.ai. Vendor claim, unverified.
- [What the Research Actually Says About Semantic Layers and Text-to-SQL Accuracy](https://medium.com/@kalingwu/text-to-sql-accuracy-semantic-layer-research-f39f62b952ba), Medium. Source of the critique that no one compared a compiled layer against an equally rich written context.
