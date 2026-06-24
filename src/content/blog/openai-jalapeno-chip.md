---
title: 'OpenAI Built Its Own Chip, and Called It Jalapeño'
description: 'OpenAI and Broadcom unveiled Jalapeño, OpenAI''s first custom inference chip. The name is silly. The reason behind it is the most strategic move the company has made in a while.'
pubDate: '2026-06-24'
heroImage: '/images/blog/jalapeno-chip.webp'
tags: ['ai', 'hardware', 'openai', 'strategy']
---

OpenAI just unveiled its own silicon. It's called Jalapeño, which is a deeply unserious name for a deeply serious move.

Jalapeño is OpenAI's first "Intelligence Processor," a custom chip built with Broadcom and aimed squarely at LLM inference, the running of models rather than the training of them. Engineering samples are already in the lab running real workloads, including GPT-5.3-Codex-Spark, at production-target power and clocks. Deployment is planned for the end of 2026, with Celestica building the server systems.

I usually write about software here. But this one is worth a detour, because the chip itself is less interesting than why OpenAI bothered to build it.

## The real story is Nvidia

For years, training and running frontier models has meant buying Nvidia GPUs. They're brilliant, they're expensive, and they're hard to get. Long lead times, allocation games, and a single vendor sitting on the margin of the entire AI industry.

Jalapeño is OpenAI buying its way out of that dependence. A chip you design yourself, tuned for exactly your models, manufactured to your schedule, is a chip you don't have to wait in line for or pay Nvidia's markup on. Google did this years ago with the TPU. Amazon has Trainium. OpenAI building custom silicon was always a question of when, not if, and the answer turned out to be now.

It also explains the partner. Broadcom is the same company that helped build Google's TPU, so OpenAI hired the playbook, not just a fab. Richard Ho, who led Google's TPU effort, runs the hardware team.

## The detail that actually made me sit up

The chip is fabricated by TSMC on a 3nm process, with a systolic-array design and high-bandwidth memory. Standard frontier-accelerator stuff. The number that stands out is the timeline: from initial design to tape-out in about nine months, which would be one of the fastest cycles ever for a chip this advanced.

Part of how they pulled that off is the part worth noticing: OpenAI used its own models to accelerate the design and optimization. AI helping design the hardware that runs AI. That loop, models improving the silicon that makes the next models cheaper to run, is the kind of compounding advantage that's hard to copy and easy to underestimate.

## Hold the hype, though

A first chip is a first chip. A few reasons not to over-read this:

- **It's inference-focused and starting modest.** Reporting points to a limited role in OpenAI's infrastructure at first, not a wholesale replacement of its Nvidia fleet. Training still leans on GPUs.
- **First tape-outs don't always work.** There's no guarantee the first run yields a fully production-ready chip. Silicon is unforgiving in ways software isn't.
- **Performance-per-watt claims are early.** "Substantially better than state of the art" is based on early lab testing, not a year of production at scale. Believe it when the data centers are humming.

## Why it matters anyway

Even with the caveats, the direction is the point. The biggest names in AI are all deciding that renting compute from one vendor forever is a bad long-term position, and they're spending billions to own the bottom of their own stack.

If that works, it pushes the cost of running models down, which is good for everyone building on top of them, including the small teams who'll never design a chip but will absolutely feel a cheaper inference bill. The silly pepper name will be forgotten. The move it represents, AI labs becoming hardware companies, is one of the defining shifts of this stretch.
