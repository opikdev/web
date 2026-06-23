---
title: 'skills.sh: npm for AI Agents Has Arrived'
description: 'Vercel launched skills.sh and it hit 20,000 installs in six hours. The pitch: stop teaching your agent the same tasks over and over, and npx skills add them instead.'
pubDate: '2026-01-23'
heroImage: '/images/blog/skills-sh.webp'
tags: ['ai', 'agents', 'tools', 'vercel']
---

The line that sold it: npm, but for what your AI agent knows how to do.

Vercel launched skills.sh on January 20, and it hit **20,000 installs in six hours.** A few days later the install graph had gone vertical. For something that's basically a directory of markdown files, that's a lot of heat, so let's look at what it is and whether the hype is earned.

## What it is

A "skill" here isn't code in the usual sense. It's procedural knowledge, packaged: a markdown file that teaches an agent how to handle a specific task, the way a good runbook teaches a new hire.

skills.sh is the registry and CLI for those packages:

- `npx skills find` to discover what's out there.
- `npx skills add` to install one into your agent.
- A leaderboard so you can see what's actually used, not just what exists.

It runs straight through `npx`, no install or account needed to browse. And it's agent-agnostic: the same skills work across Cursor, Claude Code, GitHub Copilot, Codex, Goose, Windsurf, and more. That portability is a big part of why it spread.

## Why the idea is good

**It stops you re-teaching the same thing.** Every team keeps explaining the same tasks to their agent: how we write commits, how we structure a migration, how we file a ticket. A skill captures that once and reuses it, so the knowledge stops living in your head and your scrollback.

**It separates reasoning from execution.** Instead of letting the agent improvise shell logic on the fly, you give it a curated set of known-good operations. Safer and more predictable: the agent reasons about *which* skill to use, not *how* to reinvent it each time.

**It's shareable by default.** Publish a skill, reuse someone else's. A common library of agent actions, built in the open, compounds across a community. It's the same skills ecosystem that tools like [OpenClaw and Hermes](/blog/hermes-the-agent-that-learns/) plug into.

## The mess underneath the hype

The growth curve is hiding something.

**The explosion wasn't all signal.** Researchers clocked an **18.5x jump in listed skills in 20 days**, but a lot of it was bursty. Thousands of developers rushed to upload *something* just to ride the trend. A huge directory isn't the same as a good one.

**Quantity bred noise.** When everyone uploads at once, you get dozens of near-identical skills of mixed quality, and discovery gets harder, not easier. The leaderboard helps; the long tail is a junk drawer.

**Installing a skill is running someone else's instructions.** This is the part to sit with. A skill tells your agent what to do, and your agent has access to your tools, your repo, your accounts. An unvetted skill is an untrusted instruction set with real reach. The same "just `npx skills add` it" convenience that drove adoption is also a supply-chain risk if you don't read what you're installing.

The package-manager-for-agents idea is here to stay. npm proved how powerful a shared registry is. skills.sh now has the same homework npm eventually did: keeping the marketplace useful and safe once everyone shows up at once. Worth watching whether they do it before the junk-drawer problem sets in.
