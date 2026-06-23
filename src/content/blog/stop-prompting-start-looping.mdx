---
title: 'Stop Prompting, Start Looping'
description: 'The hot take taking over my feed: the best AI engineers aren''t writing better prompts anymore — they''re building loops that prompt the agent for them. Here''s what loop engineering actually is, and where it bites.'
pubDate: '2026-06-10'
heroImage: '/images/blog/loop-engineering.webp'
tags: ['ai', 'agents', 'loop-engineering', 'workflow']
---

There's a line going around that reframes how you work with AI in one sentence: **stop prompting your coding agent, and start designing the loop that prompts it for you.**

It hit a nerve. The phrase "loop engineering" spread across X in days, and the framing is sharp enough to be worth taking seriously — not as a buzzword, but as a real shift in where the leverage lives.

Here's the idea, what it actually looks like, and the part the hype is quietly skipping.

## The shift in one sentence

Prompt engineering optimizes a single interaction. You write a prompt, read the reply, write the next one. You're in the loop, turn after turn.

**Loop engineering optimizes the system around the interaction.** As Addy Osmani put it: *"Loop engineering is replacing yourself as the person who prompts the agent. You design the system that does it instead."*

The difference is the unit of value. With prompting, the unit is the *response* — get one good answer. With looping, the unit is the *trajectory* — the whole act-observe-reason-repeat cycle that runs until a goal is met. A single bad turn doesn't matter if turn four catches the bug and fixes it.

That reframe is why it caught on. The chatbot answers a prompt. The agent runs a `while` loop that carries state across turns — and the engineer's job moves from *writing the prompt* to *designing the loop*.

## What a loop actually is

Strip away the hype and a loop is a simple repeating cycle:

1. **Perceive** — take in the goal, the last result, the errors.
2. **Reason** — figure out what that means and what the options are.
3. **Act** — run a tool, write code, call an API.
4. **Observe** — read the result. Success moves forward; failure feeds back into reasoning.

Then it repeats until a termination condition is true. That last part is the whole game.

A concrete version looks like this: an automation runs each morning, a triage step reads the CI failures, isolated worktrees get opened so fixes don't collide, sub-agents draft and review the work, PRs open automatically, and anything unresolved lands in an inbox for you. You didn't prompt any of it. You designed the thing that did.

## Why the good loops work and the bad ones burn money

The gap between a loop that ships and a loop that spirals comes down to a few design choices.

**Good loops verify before they stop.** The agent that wrote the code doesn't get to grade its own work — a separate model checks whether the goal is actually met. A loop without real termination criteria just refines forever.

**Good loops have hard bounds.** Iteration caps. Token budgets. No-progress detection that exits when the state stops changing. Circuit breakers that fail loudly instead of silently.

**Good loops keep a human at the irreversible steps.** Auto-merging a PR is not the place to find out your verifier was wrong.

The failure modes are real and well documented: infinite loops that never decide they're done, context overflow that degrades reasoning, silent failures that report confidence with zero progress, and token explosions — one writeup describes an agent making 400 tool calls in five minutes. The costs aren't theoretical either. A single agent burns roughly 4x the tokens of a normal chat; multi-agent setups around 15x. One documented case hit **$1.3 million in monthly token usage.** A loop without a budget is a bill without a ceiling.

## The part the hype skips

The viral version of this idea makes it sound like pure upside: design once, let it run, collect the output. Three quieter problems come with it.

**Unattended loops make unattended mistakes.** As the line goes, *"a loop running unattended is also a loop making mistakes unattended."* The faster it works, the more it can get wrong before you look.

**Comprehension debt compounds.** The more code a loop ships that you didn't write, the wider the gap between what exists in your repo and what you actually understand. That gap has interest, and it comes due during the next incident.

**Cognitive surrender is the real trap.** The comfortable posture — accept whatever the loop produced, press go again — is exactly the dangerous one. The leverage is real, but it doesn't remove the need for judgment. It concentrates it.

## Bottom Line

Loop engineering is a genuine shift, and the core claim holds up: the people getting the most out of AI right now aren't writing cleverer prompts, they're building well-bounded loops that finish tasks reliably.

- **The shift:** the unit of value moved from the response to the trajectory — from one good answer to a cycle that self-corrects until the goal is met.
- **What makes it work:** independent verification, hard bounds (iterations, tokens, no-progress exits), and a human on the irreversible steps.
- **What the hype skips:** unattended loops fail unattended, comprehension debt compounds, and the comfortable move — surrendering judgment — is the one that bites.

The work didn't get easier; the leverage point moved. So build the loop — but, in Osmani's words, *"build it like someone who intends to stay the engineer, not just the person who presses go."*
