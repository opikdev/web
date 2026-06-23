---
title: 'When Prompts Become Shells: Prompt Injection Is a CVE Now'
description: 'A prompt injection just earned a CVSS 10.0 and remote code execution on the host. We''re shipping AI agents faster than we''re securing them — here''s the one that made it official.'
pubDate: '2026-05-30'
heroImage: '/images/blog/prompt-injection-cve.webp'
tags: ['ai', 'security', 'agents', 'prompt-injection']
---

For a while, prompt injection felt like a content problem. The model says something it shouldn't. Embarrassing, fixable, not scary.

That framing is dead. In May, a prompt injection in Microsoft's Semantic Kernel got a CVE number, a CVSS score of **10.0 — the maximum** — and a clear path to remote code execution on the host the agent runs on. Prompt injection officially graduated from "the model misbehaves" to "the attacker owns your server."

If you're building anything agentic, this is the incident to internalize.

## What actually happened

The vulnerability, CVE-2026-25592, turned a text trick into a shell.

**The setup:** Semantic Kernel runs model-generated code inside an Azure Container Apps Python sandbox. An internal helper, `DownloadFileAsync`, was accidentally tagged `[KernelFunction]` — which exposed it to the LLM as a callable tool, with no path validation.

**The exploit:** an attacker who can influence a single agent prompt — through indirect injection, like a poisoned document or web page the agent reads — can drive the agent to write arbitrary files outside the sandbox. Combine that with a write to a startup directory or a CI hook, and you have full remote code execution on the host.

**The kicker:** no authentication, no user click, no network position required. Just text the agent was willing to read.

The root cause is one sentence, and it's the whole lesson: **trusting model-routed input deep enough that it reaches a code-execution primitive.**

## Why this is different from "the model said a bad thing"

The mental model that gets people hurt is treating the LLM like a trusted component. It isn't one.

In a normal app, you know where untrusted input enters and you guard that boundary. In an agent, *the model itself routes input to tools* — and the model will faithfully relay whatever an attacker fed it. A document the agent summarizes, a webpage it browses, an email it triages: any of those is now an input channel straight to your function-calling layer.

So the dangerous combination is simple and common: **untrusted content + a tool that touches the filesystem, the shell, or the network.** Prompt injection is the carrier. The exposed primitive is the payload. The CVE just proved the chain end to end, at maximum severity.

## What this means for what you build

You don't need to stop building agents. You need to stop trusting the model as a security boundary. A few principles fall straight out of this.

**Treat every tool the model can call as attacker-reachable.** If the LLM can invoke it, assume a malicious prompt eventually will. Validate inputs at the tool, not in the prompt.

**Keep code-execution primitives away from model-routed input.** File writes, shell calls, network fetches — these need real sandboxing and path validation, not a polite system prompt asking the model to behave.

**Assume indirect injection.** The threat isn't just what your user types. It's every document, page, and message your agent reads on their behalf. Untrusted-by-default is the only safe posture.

**Patch the framework, then audit your own surface.** Semantic Kernel fixed this in 1.39.4 (Python) and 1.71.0 (.NET). But the bug was a pattern — an over-exposed helper — and that pattern lives in plenty of homegrown agent code too.

## Bottom Line

Prompt injection is no longer a content bug. It's a CVSS 10.0, RCE-on-the-host security category, and the industry now has the receipt to prove it.

- **What happened:** an indirect prompt injection in Semantic Kernel reached an unvalidated file primitive and escalated to remote code execution — no auth, no click.
- **The real lesson:** the LLM is not a trust boundary. It will route attacker-controlled text straight to whatever tools you exposed.
- **What to do:** validate at the tool layer, sandbox anything that executes, and treat every document your agent reads as hostile until proven otherwise.

We're shipping agentic capability faster than we're shipping the security model to hold it. This CVE is the gap made visible. Build like the prompt is already compromised — because, eventually, it is.
