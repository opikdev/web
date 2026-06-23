---
title: 'Pencil: I Watched Six AI Agents Design Together'
description: 'Pencil is an AI-native design tool where a swarm of agents builds on one canvas at once. I used it to make the hero images on this blog, so here''s the honest take, not a feature list.'
pubDate: '2026-03-18'
heroImage: '/images/blog/pencil-agents.webp'
tags: ['ai', 'design', 'agents', 'tools']
---

The demo that got everyone's attention is genuinely strange to watch: you type "design an app to do X," and six AI agents fan out across one canvas and build it together, each with its own cursor and name, in real time. It looks less like using a tool and more like watching a small team work at 10x speed.

That's Pencil, an AI-native design tool from Tom Krcha. I have a slightly unusual reason to write about it: I made the hero images on this blog with it. So this isn't a researched feature list. It's what I actually noticed.

## What it is

Pencil is a design editor built for AI from the ground up, not Figma with an AI panel bolted on. A few things make it different:

- **The canvas is the agent's workspace.** You prompt, and the agent (or a swarm of them) lays out screens, components, and visuals directly on an infinite canvas. The 6-agent "swarm mode" is the headline trick, and it reportedly works best with Claude 4.6 driving.
- **Files are just JSON.** Designs save as `.pen` files, which Krcha has been open about being plain JSON underneath. That sounds like a footnote, but it's the whole reason the next point works.
- **It lives where you code.** There's a standalone app, but it also plugs into your editor through MCP: a Cursor extension, or Claude Code via `/mcp`. One prompt can turn a design into a React site.

The growth backs up the hype. Pencil went from a side project to 100,000 users in about eight weeks.

## What it was actually like to use

I didn't run the viral 6-agent app demo. I used it for something smaller and real: generating a consistent set of blog hero images in a specific style, then exporting them.

A few things stood out. Because `.pen` is JSON and it speaks MCP, the design surface and my coding agent weren't two separate worlds I had to copy-paste between. I could describe the house style once, generate a batch, eyeball them, and pull the exports straight into the repo. The thing that usually makes "design tool" and "build tool" feel like different jobs mostly disappeared.

It's not magic, though. The agents are only as good as the brief, same as any generation tool: my first style pass came out wrong and I had to redo it. And "AI-native" is a real tradeoff, not just a buzzword. You're trading the deep, precise manual control of a mature editor for speed and an agent that does the grunt work. For polished hero images that's a great trade. For pixel-perfect production UI with a fussy design system, I'd want to see more before betting a real project on it.

## Why this one matters beyond the demo

It's tempting to file Pencil under "neat viral demo" and move on. The reason I don't: it's a clean example of where design tooling is actually heading.

The interesting shift isn't "AI can generate a screen." We've had that. It's that the *boundary between designing and building is dissolving*. When the design file is JSON, the tool speaks the same protocol as your coding agent, and one prompt goes from canvas to React, "handoff" stops being a phase. That's the part worth watching, and Pencil is one of the first tools that makes it feel normal rather than demo-ware.

The 6-agent swarm is the thing that goes viral. The plain-JSON file that any agent can read is the thing that'll still matter in a year.
