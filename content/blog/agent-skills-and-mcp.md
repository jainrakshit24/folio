---
title: "Agent Skills and MCP Solve Different Problems"
description: "MCP gives an agent hands. Skills give it judgement. Teams keep reaching for one when they needed the other, and the symptom looks the same either way."
slug: "agent-skills-and-mcp"
category: "Artificial Intelligence"
tags:
  - MCP server
  - Claude Agent Skills
  - AI coding agents
  - MCP vs Agent Skills
  - AI developer tools
author: "Rakshit Jain"
publishedAt: "2026-11-21"
updatedAt: ""
cover: ""
published: true
featured: true
---

I've built both. One is an MCP server that reads a code graph, the other is a skill that profiles datasets. They look similar from the outside and they aren't interchangeable at all, which is the part most teams find out late.

Here's the split in one line: **MCP gives an agent capabilities. A skill gives it knowledge.**

## What MCP actually does

MCP is a protocol. Your agent speaks it, your server answers it, and the agent can now do something it couldn't do before, query a database, hit an internal API, read a file the sandbox would otherwise hide.

The adoption curve isn't a rumour. The protocol crossed roughly 97 million monthly SDK downloads by February 2026, and both Google and Microsoft have shipped tooling around it. It's becoming plumbing.

What MCP doesn't do is tell the agent *when* to use a tool, or what a good answer looks like once it has the data. That's the gap people keep falling into.

## What a skill does

A skill is instructions that load when they're relevant. No network, no server, no protocol. Just methodology the agent reads at the moment it needs it.

When I built the Data Intelligence Engine, the entire thing is a router over 27 intents. A request loads only the methodology that intent names, out of fifty-odd modules. The scripts do the computing, but the skill decides which checks matter for *this* question and how to grade the result.

That decision layer can't live in an MCP server. The server returns rows. Somebody still has to know that a column where only 70% of values parse as numbers is a bigger problem than one with 12% nulls.

## The failure mode, in both directions

I've watched this go wrong two ways.

**Reaching for MCP when you needed a skill.** The team builds a server with eighteen tools. The agent now has eighteen tool descriptions permanently in its context window, burning tokens on every single turn, and it still picks the wrong one, because nothing told it how to choose. Perplexity's CTO publicly said the company was moving away from MCP internally for roughly this reason: the context cost of tool descriptions.

**Reaching for a skill when you needed MCP.** The team writes a beautiful methodology document explaining how to audit the production database. The agent reads it, understands it completely, and can't run a single query, because it has no connection. It produces a confident, structured, entirely imaginary audit.

The second one is worse. The first wastes money. The second produces a document that looks right.

## A rule that has held up

Ask what's missing:

| Missing | Reach for |
|---|---|
| Access to something outside the agent | MCP server |
| Knowing what to do with what it already has | Skill |
| Both | Both, but write the skill first |

Write the skill first because a skill forces you to articulate the method. If you can't write down how a competent person would approach the problem, an MCP server won't rescue you. It will just let the agent be wrong faster, with real data.

## Where it gets interesting

The two compose. NEXUS ships as an MCP server with five tools *and* as a skill, from the same core. The server exposes `recall`, `impact`, `gate`, `remember`, `context`. The skill explains the loop those tools belong to, recall before you plan, plan before you edit, verify before you claim.

Give an agent the five tools with no skill and it'll call `remember` at random. Give it the skill with no tools and it'll narrate the loop without running it.

```bash
nexus recall "auth token"      # what do we already know?
nexus plan src/billing.py      # what breaks if I touch this?
nexus verify                   # did the checks actually pass?
```

Three commands. The protocol makes them callable. The skill makes them a workflow.

## One thing worth deciding early

If you're building for other people's agents rather than your own, skills port further. The frontmatter is a handful of fields, and the same folder drops into Claude Code, Cursor, Codex and a long tail of others without a server to host or a connection to debug.

MCP is the better answer when the capability genuinely needs a running process. It's the worse answer when you only wanted to hand the model a document.

---

**Sources**

- [MCP Is Quietly Becoming Critical Infrastructure, The New Stack](https://thenewstack.io/5-key-trends-shaping-agentic-development-in-2026/)
- [AI engineering trends: agents, MCP and vibe coding, The New Stack](https://thenewstack.io/ai-engineering-trends-in-2025-agents-mcp-and-vibe-coding/)
- [Agent primitives: MCP, skills, orchestration](https://zashraf1337.github.io/big-ideas/b/ai-dev-ecosystem-agent-primitives-mcp-skills-agents-orchestration/)
- [Open source toolkit for building AI agents in 2026, DEV](https://dev.to/anmolbaranwal/open-source-toolkit-for-building-ai-agents-in-2026-55h1)
