---
title: "Your Agent Framework Is Free Because It Was Never the Product"
description: "Google, Microsoft, OpenAI, AWS and a dozen startups all shipped an agent framework and gave it away. They converge on the same five layers, so capability is not the decision. What you are actually choosing is what you cannot leave."
slug: "agent-framework-free-not-the-product"
category: "Artificial Intelligence"
tags:
  - AI agent framework comparison
  - LangGraph vs CrewAI
  - agent observability
  - AI vendor lock-in
  - agentic framework selection
author: "Rakshit Jain"
publishedAt: "2026-11-28"
updatedAt: ""
cover: ""
published: true
featured: false
---

In roughly eighteen months, Google shipped the Agent Development Kit. Microsoft shipped Semantic Kernel, then AutoGen, then an Agent Framework that merges them. OpenAI shipped the Agents SDK. AWS shipped Bedrock Agents. LangChain built LangGraph. Then CrewAI, Mastra, and a long tail of others.

Every one of them is free.

Companies that charge money for a text editor are handing out the infrastructure layer for the most valuable product category in software right now. That is the first thing worth thinking about when you pick one, and in most teams it is the last.

## They all do the same five things

Strip the branding off any agent harness and you find the same five layers underneath.

**Orchestration** runs the workflow. Sequential or parallel, planned ahead or assembled at request time, with checkpoints so a crash does not lose an hour of work, and a pause point where a human approves something before it happens.

**Tools** are the part that makes it agentic rather than conversational. Internal ones hit your own systems, a read-only database role or a file crawler. External ones are an API call, or an MCP server where the agent discovers what is available at runtime instead of being told.

**Retrieval** is how the agent reaches your unstructured material. Load, parse, chunk, embed, store, search, rerank. Everyone implements this and most frameworks ship a default vector store you will eventually replace.

**Observability** records what happened. Which agent called which tool, how many tokens, how long, what it cost, what failed.

**The ecosystem** is the cloud, the default model provider and the SDK language the whole thing assumes.

This breakdown is not controversial. It is roughly what every framework's architecture page says, because the problem shape forces it.

## Which makes the comparison tables theatre

Open any "LangGraph vs CrewAI vs AutoGen" post. Scroll to the matrix. Multi-agent, yes and yes and yes. Tool calling, yes. Streaming, yes. Human in the loop, yes. Memory, yes.

They converge because they are solving an identical problem against identical model APIs, and because any gap gets closed within a release or two by a competitor's user filing an issue.

So the honest answer to "which framework is most capable" is that it does not matter much, and anyone selling you a strong opinion on it is selling you something. The interesting question is a different one.

## Look at which layer costs money

| | Free tier | Paid |
|---|---|---|
| LangSmith | 1 seat, ~5,000 traces/month | ~$39 per seat, more traces |
| CrewAI AMP | ~50 executions/month | Enterprise, custom |
| Mastra Platform | Starter, ~100k observability events | ~$250 per team per month |

The frameworks are open source. LangGraph, CrewAI, Mastra, all of them, self-host for nothing. What is behind the card is the hosted platform, and the thing the hosted platform mostly sells is **the trace**.

Note what is not being sold. None of these vendors resell you inference. Every tier still makes you bring your own model API keys. They are not making money on what your agents think. They are making money on the record of what your agents did.

That is a deliberate choice and it tells you where they believe the lock-in is.

## They are right, and almost nobody budgets for it

Orchestration is the layer people agonise over and it is the cheapest one to leave.

A workflow graph is a few hundred lines describing agents, tasks and the edges between them. If you had to port it to a different framework you would spend a week, and honestly a competent model would do most of the translation for you. Painful, bounded, survivable.

Now try to leave your observability platform.

Eighteen months of traces. The evaluation baselines you scored every release against. The regression history you point at when somebody asks whether last month's prompt change made the agent worse. The cost attribution that tells you which customer is unprofitable.

That is not a rewrite. That is a migration into a tool that computes its metrics differently, with no guarantee the new numbers are comparable to the old ones, which means your entire historical baseline quietly becomes decorative. I have written before about [agent tests that prove nothing](/blog/agent-tests-that-prove-nothing), and this is the industrial version of the same problem. Losing the history does not break anything today. It just means you can no longer tell whether you are improving.

The layer treated as an afterthought during selection is the one with the real exit cost.

## The cloud hooks are at least honest

Google's ADK assumes Gemini and GCP. Microsoft's framework assumes .NET and Azure. OpenAI's SDK assumes OpenAI models. Bedrock Agents assume AWS.

None of this is hidden and none of it is unreasonable. If you are already an Azure shop, a framework that defaults to Azure is a genuine advantage and you should take it.

The trap is adopting a framework whose default cloud is not your cloud, on the theory that you will configure around it. You will, at first. Then the convenient path and the portable path diverge, and under deadline nobody picks the portable one. Defaults are not suggestions, they are where the gravity is.

## Four questions instead of a feature matrix

**Does it emit OpenTelemetry?** This is the one that matters most and the one procurement never asks. If traces come out as OTel, you can point them at Langfuse, at a self-hosted collector, at whatever you want, and the observability layer stops being a one-way door. If it only speaks the vendor's own format, you have agreed to the lock-in before writing a line of code.

**Where does state live?** A local file, a bundled database, or their cloud? This decides whether you can run the thing in an air-gapped environment, in CI, and on a laptop during an incident.

**What breaks if I switch model providers?** Swap the model in a throwaway project and see what fails. The answer is rarely nothing.

**What is the exit cost of each layer, in days?** Write an actual number next to each of the five. You will notice four of them are small and one of them is not.

## What I am not certain about

The pricing above comes from third-party comparison sites, and they disagree with each other. One source puts LangSmith trace overage at $2.50 per 1,000, another cites $5. CrewAI's middle tier appears in some comparisons and not others. Treat the table as the shape of the business model, which is consistent everywhere, not as a quote. Check the official pricing pages before you budget anything.

I should also say plainly that none of this makes the lock-in sinister. Someone has to pay for the engineering, and selling the platform while giving away the library is a more honest trade than most. The problem is not that the trade exists. It is that teams evaluate the free half carefully and accept the paid half by accident.

## The boring recommendation

Use the framework your team already knows, in the cloud you already pay for, and make OpenTelemetry support a requirement rather than a nice-to-have.

That is an unsatisfying answer for anyone hoping a benchmark would decide it. But the capability differences are small and shrinking, the ecosystem differences are large and permanent, and the only part of this stack you genuinely cannot walk away from is the one you were planning to treat as logging.

If you are earlier than this and still working out what goes in the tools layer at all, I wrote about [why MCP and agent skills solve different problems](/blog/agent-skills-and-mcp).

---

**Sources**

- [LangSmith Pricing Explained (2026)](https://inference.net/content/langsmith-pricing/) and [Langfuse vs LangSmith: Pricing, OSS and Tracing](https://www.truefoundry.com/blog/langfuse-vs-langsmith). Third-party, and they disagree on overage rates.
- [CrewAI Pricing 2026: Plans, Limits, and the Token Bill](https://www.lindy.ai/blog/crew-ai-pricing).
- [LangGraph vs CrewAI vs Mastra (2026): Orchestration Compared](https://wetheflywheel.com/en/comparisons/langgraph-vs-crewai-vs-mastra/), for the Mastra platform tiers.
- The five-layer breakdown is the common industry decomposition. It is set out at length in "AI Agents (07): Agentic Harness" by 0s & 1s on Medium, September 2026, which is worth reading if you want each layer in more depth than this post goes into.
