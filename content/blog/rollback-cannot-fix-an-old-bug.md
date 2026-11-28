---
title: "The Bug Was Four Months Old, So There Was Nothing Left to Roll Back"
description: "Microsoft 365 went down across 70-plus countries on 12 November. The defect had shipped in July. Every incident playbook assumes the bad change is the last one you deployed, and that assumption is what turned an outage into two days."
slug: "rollback-cannot-fix-an-old-bug"
category: "Cloud Computing"
tags:
  - Microsoft 365 outage
  - incident response
  - rollback strategy
  - blast radius
  - cloud reliability
author: "Rakshit Jain"
publishedAt: "2026-11-29"
updatedAt: ""
cover: ""
published: true
featured: true
---

The first thing any on-call engineer does is look at what shipped recently. It is the single highest-yield question in incident response, because most outages are caused by the last change somebody made.

On 12 November, Microsoft looked at what shipped recently and the answer was: nothing relevant. The change that was taking down Outlook, Teams and Copilot across more than seventy countries had been deployed in **July**.

There was no rollback to perform. The thing you would roll back to was already the thing running.

## What actually happened

The outage began between **17:00 and 18:00 UTC** on 12 November. Here is the public timeline, which is less tidy than the headlines suggested.

| Time (UTC) | Status |
|---|---|
| 17:00–18:00, 12 Nov | Outage begins |
| 17:54, 12 Nov | First acknowledgement — Americas, Exchange Online mailboxes |
| 18:07, 12 Nov | Warning of broader, global problems |
| 23:04, 12 Nov | "Returning some affected servers to service" |
| 04:36, 13 Nov | Partial recovery in some regions |
| Morning, 14 Nov | Services fully restored |

Note the last row. Most coverage reported this as a one-day outage, and for most people it was, but full restoration came on the morning of the **14th**. The tail of an incident is always longer than the headline.

The technical core, per Microsoft's public cause summary posted on 16 November: a previously undetected defect caused the networking gateway servers to become unresponsive under certain load conditions. At peak, **more than 80%** of the servers hosting the networking gateway service were unresponsive.

Microsoft separately described it as a process that establishes secure connections becoming overwhelmed, after which servers stopped handling requests at all.

Four things had to line up on the same afternoon.

1. The latent defect, shipped in July, never triggered until now.
2. A change in traffic allocation in the network fabric raised load and made the defect more likely to fire.
3. Planned maintenance on the gateway hosts had already taken **14%** of fleet capacity offline.
4. North American traffic was climbing toward its daily peak.

Any one of these alone was survivable. Nobody tests the fourth one against the first one.

## Why the rollback did nothing

This is the part worth internalising, because it is not a Microsoft problem. It is an everyone problem.

Automated rollback could not mitigate the defect, because the change that caused it was deployed in July 2026.

Think about what your own rollback capability actually covers. You can revert the last deploy. Probably the last several. Your pipeline keeps some number of previous artefacts, your feature flags have some retention, your infrastructure state has some history. Pick a number — thirty days, ninety days, whatever yours is.

Now ask what happens when the bad change is older than that window. Not a bad change you knew about. A change that was fine for four months, that passed every gate, that is now simply part of what "working" looks like in your environment.

Your rollback button points at a version that also contains the bug. There is nothing to go back to. You are not doing incident response any more, you are doing development, at peak traffic, in production, with everybody watching.

The industry has spent a decade getting very good at reverting recent changes, and in doing so has quietly made recent changes the only kind of failure it is good at.

## The blast radius that was not one

Microsoft's second admission is the one I keep rereading. The "capacity units" abstraction — the mechanism meant to separate infrastructure so a failure stays local — **failed to isolate the issue**, so it spanned regions and became worldwide.

Every large system has one of these. Cells, shards, partitions, availability zones, deployment rings. The entire promise is that a fault inside one does not become a fault in all of them.

The promise holds for the failure modes you designed it against. A defect in shared code, running identically everywhere, triggered by a condition that arrives everywhere at once, is not one of those failure modes. The isolation boundary was real and it did nothing, because what crossed it was not traffic or state. It was sameness.

One genuinely interesting detail sits next to this. Exchange Online could not move from the primary gateway group to the secondary. Other products could, which is why Teams, OneDrive, SharePoint and the Office apps came out of it better than mail did. The system's redundancy worked — for the services that were able to use it. One service's inability to fail over defined the shape of the entire public incident.

## The recovery caused its own outage

And then, the part that will be familiar to anyone who has brought a system back up.

When the code fix deployed, traffic overwhelmed the hosts as they became active. Microsoft called it a cascading failure from stampeding requests. Automated traffic routing had to be disabled by hand.

This is thundering herd, at the scale of a global mail platform. The fleet comes back, every client that has been retrying for hours notices at the same instant, and the newly healthy servers get hit harder than the ones that just failed. The automation that normally sends traffic to healthy hosts is now actively making things worse, so somebody has to turn it off.

If your runbook ends at "deploy the fix," it is missing a step. The restart is its own incident, and it is the one that is rehearsed least, because you only get to practise it when something has already gone badly wrong.

## What this changes about your runbook

Four questions, all answerable this week, none requiring a vendor.

**How old is the oldest change currently live?** Not your last deploy. The actual age distribution of what is running. If large parts of it predate your rollback retention, you have a class of incident with no mitigation path, and you should learn that now rather than at 2 a.m.

**What does your isolation boundary actually isolate?** Write down the failure modes it stops. Then write down the ones it does not: shared code, shared config, shared dependency versions, a condition that arrives on a clock. If the second list is longer, your blast radius is a diagram, not a control.

**Can every service use the failover you built?** Microsoft had a secondary gateway group and one major service could not move to it. Redundancy that a component cannot use is redundancy that component does not have, however the architecture diagram is drawn.

**Do you have a cold-start plan?** Specifically: staged capacity, request admission control, and a documented way to disable your own automated routing. The moment of recovery is the moment of highest load, and it is the one nobody drills.

I have written here before about [tests that pass without proving anything](/blog/agent-tests-that-prove-nothing). A rollback drill that only ever rehearses reverting yesterday's deploy belongs in the same family. It passes, it builds confidence, and it is calibrated against a failure that — when it finally mattered — was not the one that happened.

## What I do not trust about this

The detailed seven-point breakdown circulating publicly comes from a cause summary posted to X on 16 November, not from a formal published post-incident review. The Microsoft 365 admin centre reference is **MO1550821**. Treat the technical detail as a senior engineer's public explanation, which is useful, and which is not the same thing as a signed document.

Wikipedia's account of that summary is internally inconsistent — it describes "three issues" and then lists seven. Somebody is condensing, and it is not clear who.

The figure of **430 million** Microsoft 365 users is being quoted next to this outage constantly, and it is the platform's total user base, not a count of people affected. Nobody has published an affected-user number. Issues were reported across more than seventy countries, which tells you the spread and not the depth.

The economic estimate of roughly **$7 billion**, from the Anderson Economic Group, is a model rather than a measurement. Figures like this are produced quickly, are almost never revised afterwards, and exist mainly so headlines have a number in them.

Microsoft has said the outage was not caused by a cyberattack or by AI agents. I have seen the AI claim repeated anyway, usually by people selling something adjacent to it.

## The part that will not age

The specific defect is patched. The capacity-unit abstraction will be revised. Someone has already written the postmortem action item about staged recovery.

What stays is this. We built our entire reliability practice on the assumption that failure correlates with change, and we got so good at that assumption that it became the only lens we own. A four-month-old defect is invisible to it. So is a configuration that has been wrong since the beginning. So is anything that waits.

Your system is not only as reliable as your last deploy. It is as reliable as the oldest thing in it that has never yet been under load.

---

**Sources**

- [2026 Microsoft outage](https://en.wikipedia.org/wiki/2026_Microsoft_outage), Wikipedia. The timeline, the seven contributing factors, the 80% and 14% figures, the 430 million user base and 70-plus country spread, and the Anderson Economic Group estimate. It cites a cause summary posted publicly by a Microsoft executive on 16 November 2026.
- Microsoft 365 admin centre, incident **MO1550821**. The authoritative reference for affected tenants.
- Contemporaneous reporting from the BBC, The Register and CBC as cited in the above, including Microsoft's statement that the cause was neither a cyberattack nor AI agents.
