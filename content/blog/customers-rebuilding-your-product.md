---
title: "Half of Software Vendors Say Customers Are Rebuilding Their Product. Revenue Has Not Noticed Yet."
description: "KeyBanc asked 81 software companies. Somewhere between 43% and 57% say customers are recreating their product with AI coding tools. In the same survey, net revenue retention is 102% and only 8% report seat compression. Both things are true at once."
slug: "customers-rebuilding-your-product"
category: "Software Development"
tags:
  - AI coding tools
  - SaaS benchmarks
  - build vs buy
  - KeyBanc AI software survey
  - software business model
author: "Rakshit Jain"
publishedAt: "2026-11-30"
updatedAt: ""
cover: ""
published: true
featured: false
---

KeyBanc published its 2026 AI x Software Survey on 13 November, and one number escaped into every newsletter within about a day: somewhere around half of software vendors say their customers are using AI coding tools to rebuild the thing they are currently paying for.

If you sell software, that is the most alarming sentence you will read this quarter.

It is also sitting about four paragraphs away from a set of numbers that say nothing has actually happened yet. Net revenue retention is holding at **102%**. Only **8%** of vendors report seat compression. The median company lost 10% of revenue in 2025, which is an ordinary year.

Half your customers are allegedly building your replacement, and your revenue line has not moved. That gap is the whole story, and almost nobody is reporting it.

## The number everybody is quoting is two different numbers

Start with the thing that should make you suspicious.

KeyBanc's own press release reports **57%** of respondents saying their customers are *building alternative products* with AI coding tools.

SaaStr's widely-circulated writeup of the same survey reports **43%** of vendors saying customers are *already using AI coding tools to rebuild their product or features*.

Those are not the same claim. "Building an alternative product" is a competitor. "Recreating your features" is a customer who got tired of waiting for your roadmap and wrote the export script themselves. One of those ends your contract. The other one is Tuesday.

Neither source publishes the survey question, so there is no way from the outside to tell whether these are two questions or one question described twice. I have gone looking and cannot close the gap. If you are going to put this statistic in a board deck, get the actual instrument from KeyBanc first, because a fourteen-point spread between two framings of the same finding is not a rounding error — it is the difference between an existential threat and a support ticket.

## Who is actually getting rebuilt

This is the cut that nobody led with, and it is far more useful than the headline.

| Vendor size | Say customers are rebuilding |
|---|---|
| Under 100 employees | 55% |
| 100–249 employees | 40% |
| 250+ employees | 25% |

And by type: vertical software 48%, horizontal 39%, infrastructure 39%.

The number is not describing an industry-wide event. It is describing **small products**.

Which makes immediate sense the moment you say it out loud. A focused tool with a clean scope and a well-understood job is exactly the thing an AI coding agent can now produce a passable version of in a weekend. A system with fourteen years of edge cases, nine compliance certifications, three hundred integrations and a migration path from a competitor's 2019 data model is not.

So the honest version of the finding is: if your product can be described completely in one paragraph, somebody is going to try. If it cannot, they will try and quietly stop.

## The numbers that contradict the headline

Here is where it gets interesting, and where I think most of the coverage stopped reading too early.

In the same survey:

- Net revenue retention sits at roughly **100–104%** across every AI-monetisation group. Median **102%**, planned at 101% for 2026.
- **8%** report seat compression. **92%** do not.
- The median company lost **10%** of revenue in 2025 — 7 points from customers leaving, 3 from downsell.
- **65%** report no AI-related headcount reduction or reallocation in 2025.

Put the two halves together. Around half of vendors can see customers building replacements, and retention is normal, seats are not shrinking, and churn looks like it always has.

There are only a few explanations, and they have very different implications.

**The rebuilds are not finishing.** Getting to a demo is now close to free. Getting to something that holds payroll data, survives an audit, and does not lose a record during a deploy is exactly as expensive as it has always been. Plenty of these projects exist, are genuinely impressive, and will never carry production load.

**The rebuilds are finishing, and they are not replacements.** The customer rebuilt the dashboard, the export, the one report your roadmap never got to. They kept the contract. This matches the SaaStr framing — "recreate their product or features" — far better than the press release framing, and it would explain the retention numbers perfectly.

**It is finishing, and the revenue has not caught up.** Annual contracts do not churn the day a decision is made. They churn at renewal. A decision taken in September 2026 might show up in late 2027. A survey of what vendors can *see* is a leading indicator; NRR is a lagging one. Of course they disagree — they are measuring different points in time.

I think it is mostly the second and partly the third, and I would not bet money on that. What I am confident about is that anybody citing the headline alone, without the retention figures beside it, is telling you half a survey.

## The economics underneath

Worth knowing, because it is the context the rebuilding stat lives in.

Median ARR growth for 2025 was **24%**, and it splits hard by what the company actually sells: core AI product companies **34%**, companies embedding AI in a broader product **22%**, companies still developing customer-facing AI **9%**.

Then the part that should temper everyone's enthusiasm. Only **6%** of these companies met the Rule of 40 in 2025. **62%** plan to meet it in 2027, which is a sentence about hope, not about performance.

Meanwhile **44%** are over budget on AI spend year to date, and about a quarter of those are over by more than 20%. The single most-cited cause is higher-than-expected token usage.

And **8%** report broad, scaled customer deployment of their AI features. Eight percent. The top barriers given are ROI uncertainty and data privacy, tied.

So the industry picture from inside the industry is: growth is real, profitability is not, inference costs are running hot, almost nobody has their AI features fully deployed to customers — and roughly half can see those customers building something themselves. The last fact is less surprising once you have read the one before it.

## What I do not trust about this

**The sample is 81 companies.** Median ARR of $22M in 2025, so this is mostly $10M–$50M private B2B software. SaaStr says this out loud and deserves credit for it: some of the cuts rest on **four to fifteen answers**. The bootstrapped-versus-VC Rule of 40 comparison — a striking 36% against -3% — is drawn from seven to nine companies. That is an anecdote with a percentage sign on it.

**The size gradient is self-reported perception, not measured events.** The question is what vendors believe their customers are doing. A founder with 40 employees talks to customers directly and hears about the side project. A 250-person company hears about it through three layers of account management, or not at all. Some of that gradient is real, and some of it is just who finds out.

**Two of the sources are not the same kind of thing.** KeyBanc's press release is the primary document. SaaStr's version is Jason Lemkin's commentary on KeyBanc's data, and it carries his interpretation alongside the figures — including the framing that customers are building their own replacements. The numbers are KeyBanc's. Some of the conclusions are his.

**KeyBanc sells to software companies.** This does not make the survey wrong, and publishing the methodology notes is more than most do. It does shape which questions are worth asking in the first place.

**The survey ran July through September 2026.** By the time you read this, the coding tools in question have shipped another two or three generations. That cuts both ways and I would not guess which way harder.

## If you ship software, what actually follows

Stop asking whether customers *can* rebuild your product. For a growing number of products the answer is now yes, and the answer stopped being interesting.

Ask what breaks when they try. Every piece of software has a part that is genuinely hard to recreate, and it is almost never the interface. It is the data you have accumulated, the integrations you maintain so nobody else has to, the edge cases encoded over years of support tickets, the compliance posture, the fact that you are the one who gets called at 3 a.m. If you cannot name your version of that in one sentence, you have found the actual finding in this survey, and the percentage was never the point.

That is the same argument I made about [agent frameworks being free because they were never the product](/blog/agent-framework-free-not-the-product). The part that is cheap to replicate was never what you were selling. It just used to be the part that was visibly hard, and it stopped being that quite suddenly.

And watch the renewals rather than the survey. If this is real, it shows up as a rise in that 7-point churn figure some time in the next eighteen months. If it does not show up there, it was never real, no matter how many people quoted the headline.

---

**Sources**

- [AI-Native Software Companies Lead on Growth, but Stronger Economics Have Not Yet Followed](https://www.prnewswire.com/news-releases/ai-native-software-companies-lead-on-growth-but-stronger-economics-have-not-yet-followed-302939303.html), KeyBanc Capital Markets via PR Newswire, 13 November 2026. The primary release, and the source of the 57% figure, the growth-by-AI-type splits, and the AI-spend-over-budget figures.
- [KeyBanc's 2026 AI x Software Survey](https://www.saastr.com/keybancs-2026-ai-x-software-survey-24-growth-only-6-at-the-rule-of-40-and-43-of-vendors-watching-customers-vibe-code-their-product/), Jason Lemkin, SaaStr. Commentary on KeyBanc's data, and the source of the 43% figure, the sample size and fielding dates, the size and vertical breakdowns, the Rule of 40 cuts, net revenue retention, seat compression and churn. The interpretation is his; the numbers are KeyBanc's.
- [KeyBanc AI and SaaS benchmark results](https://www.key.com/businesses-institutions/industry-expertise/ai-saas-benchmark-results.html), KeyBanc. Where the full report and, more usefully, the survey instrument can be requested.
