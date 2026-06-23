# Content Style Guide

How blog posts on `opik.dev` are written. The goal: a reader finishes a post thinking *"this person actually knows what they're talking about, and they're not wasting my time."* Clear, useful, honest, and unmistakably written by a human, not generated.

## Stay scannable. Sameness is the problem, not structure.

Non-negotiable: posts must be **easy to scan and straight to the point.** Short paragraphs, clear `##` sections, bullets for lists, bold lead-ins where they earn their place. A reader skimming headings should get the gist; a reader in a hurry should hit the important parts fast. Do not turn posts into dense prose walls in the name of sounding human. That just makes them boring. Keep the structure.

What *does* read as AI is **mechanical sameness**: every post the same skeleton, the same length, the same tic phrases, the same ending. The fix is to keep the scannable format but vary it:

- **Section headers: make them specific, not generic.** "One name, three different bets" beats "## The honest read." Never reuse the same boilerplate headers ("The part the hype skips," "Why it matters") post after post. Name what's actually in the section.
- **Vary the counts.** Don't always land on exactly three bold points or a three-item summary. Two, four, five, or prose, whatever the content needs.
- **Vary the length.** A tight reaction and a long deep-dive should not be the same size. Don't default to "medium."
- **Endings: drop the reflexes.** A clear takeaway at the end is good and welcome. But **don't end every post with a "Bottom Line" list, and don't end every post on a reframed rhetorical question** ("how good is it a year from now?"). Those two became the tell. Sometimes summarize, sometimes just land on the strongest line, sometimes a short verdict paragraph. Rotate.

## Voice

- **Write like a sharp engineer talking to a peer.** First person, opinions, no hedging. Not a formal essay, not forced-casual.
- **Be genuinely personal sometimes.** "My timeline has been one long argument about this." "This one broke my brain." A real reaction beats a polished one. The best anti-AI signal is a specific, slightly idiosyncratic human voice.
- **Concrete over abstract, always.** Specific numbers, named tools, real quotes, checkable facts. ("400 tool calls in five minutes," not "excessive tool usage.") Vagueness reads as generated.
- **Honest about tradeoffs.** State what's overhyped, what breaks, when *not* to use something. Genuine skepticism is both more useful and more human than relentless positivity. But don't make "now here's the honest caveat section" a formula either. Sometimes the skepticism is woven through, not boxed off.

## Phrases and tics to ease off

These became crutches across the existing posts. Not banned, but if you've used one recently, reach for something else:

- The contrastive reframe: *"It's not X, it's Y"* / *"The X was never A. It's B."* Powerful once; a tell when it's in every post.
- *"that's the whole game" / "the whole story" / "the whole pitch."*
- *"the part the hype skips," "keep a clear head," "worth keeping your head about."*
- Ending on a reframed rhetorical question.
- **Em-dashes.** This is the single most common AI tell. Default to periods, colons, parentheses, or plain commas. Keep at most one or two per post, only where one genuinely reads best. (This guide aims for the same.)

The point isn't to never use these. It's that no single move should be recognizable as *your* move.

## What stays

- **Punchy openings, no preamble.** Still good. Just don't make all of them the same kind of punchy.
- **No filler.** Cut "it's worth noting," "in today's landscape," throat-clearing. Every sentence earns its place.
- **Practical over hype.** What works, what it costs, what the tradeoffs are.

## Interactive elements (charts, stats, timelines)

Posts can embed small interactive components inline, like the image you'd normally drop mid-article, but live. They live in `src/components/` (`BarChart`, `StatStrip`, `Timeline`). To use one, the post must be **`.mdx`** instead of `.md` (import the component after the frontmatter). Posts with no components stay plain `.md`.

The rule is the same one that governs everything else here: **only when it makes sense, never as decoration.** An element earns its place only if it shows something prose genuinely can't, which in practice means **magnitude or sequence**:

- **Comparing values?** `BarChart` (e.g. benchmark scores, token-cost multiples). The reader sees the size of the gap at a glance.
- **A dated sequence of events?** `Timeline` (e.g. a launch-then-pulled story).
- **Punchy headline stats worth landing hard?** `StatStrip` (use sparingly; if the numbers are already clear in one sentence, skip it).

Do **not** add an element that just restates prose as columns or a list. A toggle between two paragraphs, a "stepper" for steps that read fine as a numbered list, a stat box for two numbers already in a sentence: all decoration, all cut. When in doubt, leave it as text.

Two hard requirements:

- **SEO-safe by construction.** Every value must render as real HTML (text, a caption, or a `<table>`), and also be stated in the surrounding prose. The component is the enhancement, never the only source of the fact. JS only animates; nothing breaks or disappears without it.
- **Keep it light.** No heavy charting libraries. The existing components are plain HTML/CSS with a tiny vanilla-JS island, scoped per-post via Astro islands so the rest of the site stays zero-JS.

Most posts need none of this. Reach for an element when the data is begging for it, not to make a post feel "alive."

## Quick check before publishing

- [ ] Does this look structurally different from the last 2-3 posts? (length, sections, ending)
- [ ] Did I avoid defaulting to bold-lead-ins and a Bottom Line list just because it's easy?
- [ ] Is there at least one concrete, checkable, specific detail?
- [ ] Does it sound like a person with an opinion, not a summary?
- [ ] Did I dodge the overused phrases above, and keep em-dashes to one or two?
- [ ] If I added an interactive element, does it show magnitude/sequence (not just restate prose), and is its data in the text too?

## Frontmatter

See the schema in [AGENTS.md](AGENTS.md#blog-authoring): `title`, `description`, `pubDate` required; `description` is a specific one-sentence summary (used for SEO and listings).
