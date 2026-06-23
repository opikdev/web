---
title: 'When Prompts Become Shells: Prompt Injection Is a CVE Now'
description: 'A prompt injection just earned a CVSS 10.0 and remote code execution on the host. We''re shipping AI agents faster than we''re securing them, and here''s the one that made it official.'
pubDate: '2026-05-30'
heroImage: '/images/blog/prompt-injection-cve.webp'
tags: ['ai', 'security', 'agents', 'prompt-injection']
---

For a while, prompt injection felt like a content problem. The model says something it shouldn't. Embarrassing, fixable, not scary.

That framing is dead. In May, a prompt injection in Microsoft's Semantic Kernel got a CVE number, a CVSS score of **10.0 (the maximum)**, and a clear path to remote code execution on the host the agent runs on. It graduated from "the model misbehaves" to "the attacker owns your server." If you're building anything agentic, this is the incident to internalize.

## How a text trick became a shell

The vulnerability is CVE-2026-25592.

**The setup.** Semantic Kernel runs model-generated code inside an Azure Container Apps Python sandbox. An internal helper, `DownloadFileAsync`, was accidentally tagged `[KernelFunction]`, which exposed it to the LLM as a callable tool, with no path validation.

**The exploit.** An attacker who can influence a single agent prompt (through indirect injection, like a poisoned document or web page the agent reads) can drive the agent to write arbitrary files outside the sandbox. Combine that with a write to a startup directory or a CI hook, and you get full remote code execution on the host.

**The kicker.** No authentication, no user click, no network position required. Just text the agent was willing to read.

The root cause is one sentence: trusting model-routed input deep enough that it reaches a code-execution primitive.

## Why this isn't "the model said a bad thing"

The mental model that gets people hurt is treating the LLM as a trusted component. It isn't one.

In a normal app, you know where untrusted input enters and you guard that boundary. In an agent, the model itself routes input to tools, and it will faithfully relay whatever an attacker fed it. A document it summarizes, a page it browses, an email it triages: each is now an input channel straight into your function-calling layer.

So the dangerous combination is simple and common: untrusted content plus a tool that touches the filesystem, the shell, or the network. Prompt injection is the carrier; the exposed primitive is the payload. This CVE just proved the chain end to end, at maximum severity.

## What to do about it

You don't need to stop building agents. You need to stop trusting the model as a security boundary.

- **Treat every tool the model can call as attacker-reachable.** If the LLM can invoke it, assume a malicious prompt eventually will. Validate at the tool, not in the prompt.
- **Keep code-execution primitives away from model-routed input.** File writes, shell calls, network fetches need real sandboxing and path validation, not a polite system prompt asking the model to behave.
- **Assume indirect injection.** The threat isn't just what your user types. It's every document, page, and message your agent reads on their behalf. Untrusted-by-default is the only safe posture.
- **Patch the framework, then audit your own code.** Semantic Kernel fixed this in 1.39.4 (Python) and 1.71.0 (.NET). But the bug was a pattern, an over-exposed helper, and that pattern lives in plenty of homegrown agent code too.

We're shipping agentic capability faster than we're shipping the security model to hold it. This CVE is the gap made visible. The safe assumption from here on: build like the prompt is already compromised, because eventually it is.
