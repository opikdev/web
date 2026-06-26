---
title: 'DESIGN.md: Giving Your Coding Agent Taste'
description: 'Google Labs open-sourced DESIGN.md, a file that hands your design system to AI agents the way AGENTS.md hands them your conventions. I already run files like this, so the idea clicked instantly.'
pubDate: '2026-04-15'
heroImage: '/images/blog/design-md.webp'
tags: ['ai', 'design', 'agents', 'tooling']
---

If you've ever asked an AI to build five screens, you know the failure mode: the first looks great, and by the fifth the buttons have quietly changed shape, the spacing has drifted, and the blue isn't quite your blue anymore. The agent wasn't wrong on any single screen. It just had no memory of what "your design" means.

DESIGN.md, a spec Google Labs open-sourced this month out of the Stitch team, is a fix for exactly that. And it clicked for me immediately, because I already run files like this. This blog has an `AGENTS.md` and a `CONTENT_STYLE.md` that tell my coding agent how the project works and how I write. DESIGN.md is the same move, pointed at design.

## What it actually is

A DESIGN.md file is two halves in one document:

- **Machine-readable tokens up top**, as YAML: exact hex codes, font sizes, spacing values, corner radii, component styles. The precise values an agent should use, with no guessing.
- **Human-readable rationale below**, as plain markdown: *why* those values exist and how to apply them. Not just "the accent is `#09090b`" but what it's for.

That second half is the part I find clever. Design tokens alone tell an agent *what* a color is. The prose tells it *what the color is for*, which is the thing that actually keeps generated UI on-brand instead of just technically-correct.

## The reframe

Here's the line that stuck with me, paraphrased from the writeups: the question shifts from "how do I describe my design in this prompt" to "where does my design live so every agent can read it."

That reframe is the core of the `.md`-for-agents pattern, and it's bigger than design. We're watching instructions to AI split into layers: `AGENTS.md` for how the codebase works, `SKILL.md` for reusable procedures, `DESIGN.md` for the visual system. Persistent, versioned, in the repo, readable by any agent. You stop re-explaining yourself every prompt and start maintaining a small set of source-of-truth files instead.

## The part I didn't expect: it validates

DESIGN.md isn't just a document, it ships with a CLI validator. It can check the file against the spec, catch broken token references, and flag WCAG contrast failures, then surface the results as structured JSON an agent can act on.

That's a genuinely good idea. A design system an agent can *read* is useful. A design system an agent can read *and be checked against* is a different thing: now "did this screen follow the system" has a machine answer, not a vibe.

## Worth a little skepticism

It's an early, open draft, so a few honest caveats:

- **It's a spec, not magic.** It makes agents more consistent; it doesn't give them taste. A bad design system documented perfectly produces consistent bad design.
- **Someone still has to write and maintain it.** Like AGENTS.md, a DESIGN.md that drifts out of sync with the real product is worse than none, because now the agent confidently follows stale rules.
- **It's young.** Open-sourced this month, still a draft. The format will move. Adopt it for the idea, not as a frozen standard.

The reason I think this one sticks isn't the file format. It's the underlying shift: we're learning to give agents persistent context instead of better prompts. DESIGN.md is that lesson applied to the one area agents were quietly worst at. I've felt the difference on the text side already. Pointing the same trick at pixels is overdue.
