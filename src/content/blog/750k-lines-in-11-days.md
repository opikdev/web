---
title: '750,000 Lines in 11 Days: The Bun Migration That Broke My Brain'
description: 'Someone ported Bun from Zig to Rust — 750K lines, 99.8% of tests passing, 11 days — using Claude Opus 4.8''s dynamic workflows. Here''s what actually happened and why it matters.'
pubDate: '2026-06-04'
heroImage: '/images/blog/bun-migration.webp'
tags: ['ai', 'agents', 'claude', 'workflow']
---

Every so often a single result moves the line of what feels possible. This one did it for me.

Jarred Sumner ported the Bun runtime from Zig to Rust. Roughly **750,000 lines of Rust. 99.8% of the existing test suite passing. Eleven days from first commit to merge.** Not a toy, not a demo — the actual runtime, ported and green.

It was done with Claude Opus 4.8's dynamic workflows, and it's worth understanding exactly how, because the *how* is the interesting part.

## How you migrate 750K lines without losing your mind

A migration that size usually fails for one reason: it's too big to hold in one head, or one context window. The trick here was to stop treating it as one job.

**First, a workflow mapped the hard part.** Rust's ownership model is the thing that makes a Zig→Rust port painful. So one workflow went through the Zig codebase and worked out the right Rust lifetime for every struct field — the mechanical-but-brutal part, done systematically.

**Then, hundreds of agents ported in parallel.** The next workflow wrote every `.rs` file as a behavior-identical port of its `.zig` counterpart. Not sequentially — hundreds of agents at once, each on its own file, with **two reviewers on every file** checking the port.

**Finally, a fix loop drove it to green.** A loop ran the build and the test suite, read the failures, and patched until both ran clean. The same act-observe-reason-repeat cycle, pointed at "make the whole thing compile and pass."

That's the shape: decompose the impossible task, fan it out across parallel agents, verify every piece, then loop the whole thing to done.

## What "dynamic workflows" actually changed

The reason this wasn't possible a year ago comes down to what Opus 4.8 added.

Dynamic workflows let the model **plan a task, generate the orchestration to run it, fan out across hundreds of subagents, verify outputs before surfacing them, and resume interrupted jobs without starting over.** That last part matters more than it sounds — a job this long *will* get interrupted, and restarting from zero would kill it.

The verification is the quiet hero. Hundreds of agents producing code is worthless if you can't trust any of it. Two reviewers per file plus a test-driven fix loop is what turns "a lot of generated code" into "a migration." Volume without verification is just a bigger mess, faster.

## The part worth keeping your head about

A result this loud invites a bad lesson, so let's be careful about which one we take.

**This worked because the target was verifiable.** A port has a near-perfect oracle: the original behavior, encoded in an existing test suite. "Pass these tests" and "match this `.zig` file" are checkable a thousand times in parallel. Most work isn't that crisp. The technique shines exactly where you have a hard, mechanical objective and a strong way to grade it — and gets shakier the fuzzier the goal.

**99.8% is not 100%.** That last fraction of a percent on a runtime is real software that behaves differently, and finding it is human work. The agents got you a green-enough port astonishingly fast; they didn't absolve you of owning the gap.

**Bun's existing test suite did half the work.** The migration leaned on years of human-written tests as its safety net. The lesson isn't "agents replace engineers." It's that engineers who already invested in verification can now move at a speed that looks unreasonable.

## Bottom Line

The Bun migration is a genuine "the bar moved" moment — and the reasons it worked are as instructive as the headline.

- **What happened:** ~750K lines of Zig ported to Rust, 99.8% of tests passing, in 11 days, via Opus 4.8 dynamic workflows.
- **How:** decompose (lifetimes first), fan out (hundreds of agents, two reviewers per file), then loop the build-and-test until green.
- **Why it's not magic:** it worked because the goal was mechanically verifiable against an existing test suite. Strong verification is what makes massive parallel agent work trustworthy — and it's the prerequisite, not the afterthought.

The takeaway isn't "AI does migrations now." It's that the ceiling on what one engineer can attempt just went up by an order of magnitude — *if* they can define done precisely enough to verify it at scale. That condition is the whole game.
