---
title: 'Meet OpenClaw: The Self-Hosted AI Agent That Lives in Your Chat App'
description: 'It got renamed twice in a week and just landed on OpenClaw. Behind the chaotic branding is one of the most interesting open-source AI agents around.'
pubDate: '2026-01-30'
heroImage: '/images/blog/openclaw.webp'
tags: ['ai', 'agents', 'open-source', 'self-hosted']
---

As of today it's called OpenClaw. Last week it was Moltbot. Before that, something else. The name keeps changing, but the thing underneath is one of the most interesting open-source projects I've seen in a while.

So let's ignore the branding chaos for a second, because the idea is genuinely good.

## What it actually is

Strip away the name churn and OpenClaw is one sharp concept: an autonomous AI agent that lives inside the chat apps you already use.

**It runs on your machine.** Open-source (MIT), self-hosted, local. Your config and history stay on your hardware, not in someone else's cloud. For anyone who won't ship their data to a third party, that alone is the pitch.

**You bring your own LLM.** It doesn't lock you to one model. Point it at Claude, GPT, DeepSeek, whatever you want doing the thinking. OpenClaw is the harness; the brain is yours to choose.

**You talk to it where you already talk.** Signal, Telegram, Discord, WhatsApp. The agent is just another contact in your messages, quietly doing work in the background. No new app to learn.

That combination (local, model-agnostic, lives in your chat) is why it clicked.

## Why it's spreading this fast

The GitHub stars are climbing at a rate most *commercial* software never sees. A few reasons:

**No friction.** You already know how to send a Telegram message. Now that message can kick off a research task, a website audit, a CRM update.

**A real skills system.** Capabilities are organized as directories of skills, with your workspace skills taking precedence over the bundled ones. Easy to teach it new tricks, easy for a community to share them.

**Immediate utility.** People are already using it for lead generation, prospect research, website auditing, CRM glue. The unglamorous automation that actually saves hours, not a tech demo.

## About that name

You can't write about this project without the branding saga, because it's funny. It launched under one name, got renamed to Moltbot on January 27 after a trademark complaint, then renamed again three days later (today) to OpenClaw, reportedly because "Moltbot" never rolled off the tongue. Two renames in a week.

Chaotic, sure. But it's a very open-source kind of chaos: a fast-moving project shipping and adjusting in public, more worried about momentum than polish. Even the version scheme is date-based (`2026.M.DD`), so you can tell how current your install is just by reading the number.

## The part to take seriously

A self-hosted agent with access to your messages, email, and calendar is powerful, and it's a real attack surface.

**Permissions are broad by design.** To be useful, OpenClaw wants into the things that run your life. That's what makes it handy and what makes it risky if a skill misbehaves.

**Unvetted skills are the weak point.** The same extensibility that makes the skills system great means you can install code that does things you didn't intend. Researchers have already flagged unvetted skills doing data exfiltration and prompt-injection tricks. Treat third-party skills like any random script with access to your accounts: with suspicion.

The branding will probably settle down (let's hope OpenClaw sticks). The idea — your agent, your model, your machine, in the chat app you already live in — is the part that's going to last.
