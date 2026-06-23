---
title: 'Welcome, Fable: Anthropic Just Shipped Its Most Powerful Model'
description: 'Anthropic released Claude Fable 5 — a model from its secret "Mythos" tier, sitting above Opus. It''s built for long, ambitious, autonomous work. Here''s what makes it special.'
pubDate: '2026-06-09'
heroImage: '/images/blog/welcome-fable.webp'
tags: ['ai', 'anthropic', 'claude', 'llm']
---

Today Anthropic let something out of the vault.

Claude Fable 5 is the first public model from its top-secret "Mythos" tier — a class that sits *above* the Opus family, not inside it. Anthropic is calling it the most powerful model it has ever made generally available, and for once the superlative comes with numbers to back it up.

Let's get to know it.

## What Fable 5 actually is

Most model launches are an incremental step. This one is framed as a tier jump.

**It's a Mythos-class model, made safe for everyone.** Fable 5 is the Mythos model wrapped in safety classifiers so it can ship to the public. Its sibling, Mythos 5, is the same model with the guardrails lifted for vetted cybersecurity and infrastructure work. Same brain — two doors.

**It's built for long, hard, autonomous work.** This is the key positioning. Fable 5 isn't tuned to win single-prompt exchanges; it's tuned for the messy, multi-day, tool-heavy, ambiguous tasks that look like *real work*. Anthropic's own line: *"the longer and more complex the task, the larger Fable 5's lead over our other models."*

**It leads on nearly every benchmark.** It posts **80.3% on SWE-Bench Pro** — about 11 points ahead of the next-best model, with Opus 4.8 at 69.2% and GPT-5.5 at 58.6%. It's also stronger on visual document reasoning and long-context focus across millions of tokens.

## The moment that sells it

Benchmarks are abstract. One early-access story isn't.

Stripe ran Fable 5 on a **50-million-line Ruby codebase** and had it perform a codebase-wide migration in a *day* — work they estimate would have taken a team over two months by hand. "Compressed months of engineering into days" is the kind of claim you discount on reflex, until it's attached to a real company and a real codebase that size.

That's the whole pitch in one example. Not "it answers questions well" — "it holds an enormous, ambiguous, multi-step job together long enough to finish it."

## What it costs and how to get it

The pricing is aggressive for a top-tier model: **$10 per million input tokens, $50 per million output** — less than half what the Mythos Preview cost.

And there's a launch window: Fable 5 is free on Pro, Max, Team, and seat-based Enterprise from June 9 through June 22. After that it moves to usage credits until capacity catches up. So if you want to feel the top of the frontier without a bill, the next two weeks are the time.

## The grown-up part: safety

A model this capable in cybersecurity and biology is genuinely dual-use, and Anthropic shipped it knowing that.

Fable 5 comes with classifiers watching for requests that touch cybersecurity, biology and chemistry, or model distillation. Anthropic says the safety fallback triggers in fewer than 5% of sessions — more than 95% involve no fallback at all. It's an honest acknowledgment that the same capability that compresses a migration could give real uplift to someone with worse intentions.

That tension — extraordinary capability that has to be carefully fenced — is the story of this whole tier. It's worth watching how it plays out.

## Bottom Line

Fable 5 is a genuine step up, not a point release.

- **What it is:** the first public model from Anthropic's Mythos tier, positioned above Opus, built for long-running autonomous work.
- **Why it matters:** 80.3% on SWE-Bench Pro with an 11-point lead, a real 50M-line migration done in a day, and pricing under half the old Mythos Preview.
- **The catch worth noting:** Mythos-class power is dual-use, so it ships behind safety classifiers — and how that fence holds is the open question.

So: welcome, Fable. It's the most capable thing Anthropic has handed the public, and the early signal is that it earns the hype on exactly the work that's hardest to fake — long, real, end-to-end.

If you've got a task that's been too big to hand a model until now, the next two weeks are a good time to find out what changed.
