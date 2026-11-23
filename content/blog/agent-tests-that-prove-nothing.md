---
title: "Your Agent Wrote the Test That Says Its Code Works"
description: "A manual audit of 1,000 AI-written unit tests found 9.6% did real work. Here's why a green suite is weak evidence when the agent wrote both sides."
slug: "agent-tests-that-prove-nothing"
category: "Software Development"
tags:
  - AI coding agents
  - AI generated tests
  - test quality
  - Claude Code
  - software testing
author: "Rakshit Jain"
publishedAt: "2026-11-23"
updatedAt: ""
cover: ""
published: true
featured: true
---

I build a tool whose main job is refusing to record a test pass it didn't watch happen. People ask me why that's worth building. This month the answer got easier to give.

## The number

Momentic's CTO manually reviewed 1,000 AI-written unit tests from his company's own production monorepo. **96 of them were doing useful work.** The rest just existed.

That's a human reading each test, not a classifier guessing. Which makes it the more uncomfortable version of the finding.

It fits a pattern showing up everywhere right now:

| Finding | Number |
|---|---|
| AI-written tests doing real verification (manual audit) | 9.6% |
| Agent writes its own tests vs. barred from it | 65.3% vs 66.2% |
| pass@k drop once rigorous tests are applied | 19.3-28.9% |
| Frontier models on fault-targeted bug tasks | 71% of solutions still buggy |

Look at row two. An experiment across 111 tasks compared agents that wrote their own tests against agents that weren't allowed to. The difference was under a point, in favour of the ones that didn't.

The tests weren't helping. They were decoration.

## Why it happens

A test is supposed to encode something you believe about the code. The agent writing the test is the same thing that wrote the code, holding the same beliefs, including the wrong ones.

So you get this:

```python
def test_discount_applied():
    result = apply_discount(order, coupon)
    assert result is not None
```

That passes. It passes if the discount is 10%, if it's 0%, if it's negative, and if the function quietly hands back the original order untouched. It runs the code without checking a single thing about what came out.

A study of 86,156 test-file patches, pulled from 33,596 pull requests authored by five different coding agents, found this exact shape at scale. Test files that execute code without asserting anything about the result.

The paper's point is sharper than "bad tests exist". It's that **a quality gate keyed on whether a test file changed overstates how much actually got verified.**

Your CI says tests changed. Your dashboard says coverage went up. Neither statement is false. Both are irrelevant.

## The part that worries me more

I work in QA. The failure mode I run into most isn't a broken test. It's a test nobody can explain.

When a person writes a weak assertion there's usually a reason you can dig out. They ran out of time, they didn't know the edge case, the spec was vague. The weakness has an author and a history.

An agent-written suite has neither. Five hundred tests land in one commit. They pass. Nobody read them. Six months later something breaks in production and the suite meant to catch it was never watching.

By then you can't tell which tests were real and which were filler, because nobody ever could.

## What to do instead

Three things, in order of how much they're worth.

**Stop counting test files.** Count assertions that would fail if you broke the thing on purpose. Mutation testing automates exactly that: it changes your code and checks whether your suite notices. A suite that stays green against deliberately broken code isn't a suite.

**Let the agent write tests. Never let it be the thing that says they passed.** This is the split I ended up building around. The agent proposes, something else observes. In NEXUS the verify gate runs the diff, the secret scan, the linter, the type checker, the vulnerability check and the test suite, and there is no code path that writes a pass it didn't observe.

Not because I trust agents less than people. Because "the tests pass" is a claim, and a claim and an observation shouldn't be stored in the same field.

**Keep your end-to-end checks.** One real request through a real system verifies more than two hundred unit tests whose assertions nobody read. Momentic's own argument is that cheap generation led teams to pile up suites, and that live validation now beats adding more of them.

## The one-sentence version

A passing suite tells you the code does what the tests expect. When the same model wrote both, that sentence collapses into "the code does what the code does", which is true of all code and useful about none of it.

---

**Sources**

- [Your coding agent shouldn't grade its own homework - Stack Overflow Blog](https://stackoverflow.blog/2026/11/13/your-coding-agent-shouldn-t-grade-its-own-homework/)
- [Beyond Test Presence: Assessing Agent-Generated Tests in Open-Source Projects](https://arxiv.org/html/2606.18168v1)
- [Engineering Reliable Coding Agents - arXiv](https://arxiv.org/pdf/2608.13867)
- [VIBEPASS benchmark - Salesforce](https://www.salesforce.com/blog/vibepass/)
- [Testing AI-generated code - Momentic](https://momentic.ai/blog/testing-ai-generated-code)
- [Mutation testing for AI-generated code - Augment Code](https://www.augmentcode.com/guides/mutation-testing-ai-generated-code)
