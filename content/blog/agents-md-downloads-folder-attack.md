---
title: "A File in Your Downloads Folder Can Hijack Your Coding Agent"
description: "Researchers found a malicious AGENTS.md sitting in a real customer's Downloads folder. It got Codex to install malware in over 90% of attempts, and the vendors say there is nothing to patch."
slug: "agents-md-downloads-folder-attack"
category: "Cybersecurity"
tags:
  - AGENTS.md prompt injection
  - AI coding agent security
  - Claude Code security
  - OpenAI Codex malware
  - prompt injection attack
author: "Rakshit Jain"
publishedAt: "2026-11-26"
updatedAt: ""
cover: ""
published: true
featured: true
---

In October, two researchers at Forever Security went looking through a customer's machine and found an `AGENTS.md` file sitting in `~/Downloads`. It was written to look like ordinary engineering notes. It was not. It was instructions for an AI coding agent, placed there by someone who did not own the laptop.

They never worked out how it arrived. That part matters less than what happened next, because they then spent the following weeks proving the file did not need anybody's help to arrive at all.

## Markdown is not an executable, which is the entire problem

Your browser can write a file into `~/Downloads` without asking you. It picks the name. It picks the contents. You do not click anything.

That has been true for years and it has not mattered much, because your operating system treats downloaded executables with suspicion. Try to run a binary that came from the internet and something stops you and makes you confirm.

A Markdown file is not a binary. Nothing stops it, because until about two years ago there was no reason to stop it. A `.md` file was text, and text does not do anything.

Then we all started pointing agents at folders.

An agent reads the instruction file in its working directory and treats the contents as direction from its operator. That is not a bug, that is the entire feature. `AGENTS.md`, `CLAUDE.md`, every one of them exists so you can tell the agent how your project works without retyping it each session.

So there is now a file format that the browser can write silently, the operating system will not flag, and the agent will obey. The researchers called Markdown the new executable. It is hard to argue with.

## What the Codex attack actually did

They ran the real file in an isolated VM and built a harmless stand-in for the rest of the testing. The payload had two steps.

Step one, persistence. It tried to get Codex to add an MCP server entry to `~/.codex/config.toml`. Not the project config. The machine-wide one, so the change survives closing the terminal and outlives the folder it came from.

Step two, payload. Install the npm package `function-color`, which was malicious, and which npm has since removed.

Codex executed the malware in **more than 90% of attempts**.

Five things stood between the file and that result: a trust gate, a write that did not always land, servers that only load at startup, the network sandbox, and a handshake timeout. The researchers worked through all five. The successful version of the payload was long, dull, and written in the voice of an internal engineering document, because that framing got past refusals that a short and obviously malicious instruction would have triggered.

Note the shape of that. The attack succeeded by being boring.

## The Claude Code version is worse in a different way

For Claude Code they planted a `CLAUDE.md` and went after a different mechanism. The file asked Claude to write a project settings file that pointed `ANTHROPIC_BASE_URL` at a server the researchers controlled.

If that lands, two things happen at once. Claude's OAuth token goes to the attacker, which they demonstrated was enough for account takeover. And the attacker's server is now answering as the model, which means it can reply with whatever tool calls it likes.

The settings write succeeded **about half the time**. Code execution in the same session happened **about a fifth of the time**, specifically when Claude spawned a subagent that opened a fresh connection to the hijacked endpoint.

One genuinely encouraging detail is buried in there. The attack worked noticeably less well in folders that already contained security notes, and subagents sometimes flagged the file as an attack on their own. Context helped. Not reliably, but it helped.

## Why there is no patch coming

The researchers are blunt about this. Their words: there is "nothing here for OpenAI or Anthropic to patch."

The agent read an instruction file in its working directory and followed it. That is documented behaviour. Removing it does not harden the agent, it removes the agent.

They compare it to phishing, and the comparison holds. Nobody patches a browser to stop phishing, because the browser rendered the page correctly. The attack lives in the content.

What is new is who falls for it. Every defence built for this class of attack assumes a human is at the keyboard, pausing, reading, deciding something looks off. An agent working on that human's behalf does not pause. It has the same credentials and none of the suspicion.

Their telemetry makes that concrete. About **half** of the customers they measured had run a coding agent inside their Downloads folder at some point. Roughly **a quarter** of agent sessions opened a real browser, which means the agent can trigger the download itself with nobody in the room.

An arXiv paper from the same month found something related and more uncomfortable. Telling the agent that a memory file is an attack does not reliably protect the output. Flagged or not, the agents still produced vulnerable code.

## What to actually do

Five things, none of which require waiting for a vendor.

**Do not start an agent in `~/Downloads`.** This sounds too obvious to write down, and half of the measured population was doing it anyway. Downloads is the one directory on your machine where arbitrary strangers have write access.

**Read any instruction file you did not write.** Including, especially, in a repository you cloned five minutes ago. A fresh clone with a helpful `CLAUDE.md` is now a delivery mechanism.

**Check your configs for things you did not put there.**

```bash
# Codex: unexpected MCP servers, or a redirected API endpoint
grep -nE 'mcp_servers|chatgpt_base_url' ~/.codex/config.toml

# Claude Code: any base URL override, project or user level
grep -rnE 'ANTHROPIC_BASE_URL|ANTHROPIC_API_URL' \
  .claude/settings.json ~/.claude/settings.json 2>/dev/null

# Did function-color ever get installed anywhere?
find ~ -type d -name 'function-color' -path '*node_modules*' 2>/dev/null
```

If that last one returns anything, treat the machine as compromised rather than merely untidy.

**Leave the approval gates and the sandbox on.** Both attacks had to get around them, and the Claude variant needed an explicit instruction to disable the sandbox to finish the job. Any content that asks an agent to turn off a safety control is telling you exactly what it is.

**If something did land, rotate credentials immediately.** A leaked OAuth token is not a password that expires eventually. It is a live session someone else is holding.

## The part that will not age

The specific package is gone. The config keys will get renamed. Both vendors will narrow the trust gates, and the next proof of concept will route around whatever they narrow.

What stays is the shape of it. An agent inherits your access without inheriting your judgement, and your filesystem is full of places other people can write to. Every folder your agent works in is a trust boundary, and most of us have not been treating any of them that way.

I write a lot here about not trusting data until you have checked it, usually in the context of [proving two systems hold the same numbers](/blog/prove-two-systems-hold-same-data). This is the same instinct pointed at a different target. An instruction file is input. Input from an unknown author gets validated before it gets executed, and right now, for most people, it simply does not.

---

**Sources**

- Gal Weizman and Omer Samet, [Markdown Is the New Executable](https://forever.security/blog/hijacking-ai-agents-via-downloads-folder/), Forever Security, 22 October 2026. Original research, and the source of every attack figure and telemetry number above.
- [AI coding agents hijacked using AGENTS.md file in Downloads folder](https://www.bleepingcomputer.com/news/security/ai-coding-agents-hijacked-using-agentsmd-file-in-downloads-folder/), BleepingComputer. Independent confirmation that the proof-of-concept page dropped the file silently.
- [Malicious File in Downloads Folder Tries to Trick AI Coding Agent Into Installing Malware](https://thehackernews.com/2026/10/malicious-file-in-downloads-folder.html), The Hacker News.
- [Security Impact of Coding Agent's Memory Files](https://arxiv.org/pdf/2610.38521), arXiv. The finding that flagging a file as malicious does not reliably protect the generated code.
