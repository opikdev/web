# Content Style Guide

How blog posts on `opik.dev` are written. This is the standard for any new post — whether drafted by a human or an agent. The goal: a reader finishes a post thinking *"this was well thought out, clearly broken down — I'll come back here to learn something new."*

This guide is derived from the existing posts in `src/content/blog/`. Read `why-astro-and-decap-cms.md` as the canonical example before writing.

## The feel we're going for

Every post should be **easy to read in one smooth pass, top to bottom**. The reader never has to backtrack, never wades through filler, and always walks away with something concrete. We earn trust by being clear and useful, not by sounding clever.

## Format & structure

- **Open with a short, quotable lead.** The first 1–3 sentences set up the problem or the point — punchy, no warm-up. No "In this post we will..." preamble.
- **Short paragraphs.** 1–4 sentences each. A paragraph should read almost like a standalone quote — a single clear idea. If a paragraph runs long, split it.
- **Lead each point with a bolded phrase**, then explain it. This is the signature pattern of the site:

  ```markdown
  **Zero JavaScript by default.** Astro ships zero JavaScript by default. When you
  build a page, it renders everything to static HTML — no React runtime, no hydration.
  ```

- **Use `##` / `###` headings to break the content into a logical, ordered flow.** A reader skimming only the headings should understand the arc of the post. A proven arc: *Problem → Why this approach → How it works → What you get → Trade-offs / When not to → Bottom line.* Don't force this arc, but the post should always move in a deliberate order, not wander.
- **Use lists when enumerating** (options, steps, criteria) — they're faster to scan than prose. Keep list items tight.
- **Always end with a summary the reader takes away.** A `## Bottom Line` (or `## Key Takeaways`) section that distills the post into its core point(s). The reader should be able to read *only* this section and still get the gist. This is mandatory — never end a post without it.

## Language & tone

- **Conversational but not sloppy.** Write like a sharp engineer explaining something to a peer — not a formal essay, not overly casual/slang either. First person ("I", "you") is good.
- **Allow a personal, honest opening** when it fits ("I spent way too much time thinking about how to build this blog."). It makes the post feel human. Don't overdo it.
- **Straight to the point.** Cut filler, hedging, and throat-clearing. No "it's worth noting that", "in today's fast-paced world", "as we all know". If a sentence doesn't help the reader, delete it.
- **Practical over hype.** Focus on what actually works, what matters, and the trade-offs — not buzzwords or marketing. State limitations honestly; a good post says when *not* to use something.
- **No cringe, no awkward forced enthusiasm.** Confidence comes from clarity, not exclamation marks or hype words.
- **Concrete over abstract.** Prefer specific examples, numbers, and named tools over vague generalities.

## Quick checklist before publishing

- [ ] Opening is a punchy, quotable hook — no preamble.
- [ ] Paragraphs are short; each carries one clear idea.
- [ ] Headings alone tell the story in a sensible order.
- [ ] Key points lead with a **bolded phrase**.
- [ ] Trade-offs / limitations stated honestly where relevant.
- [ ] No filler — every sentence earns its place.
- [ ] Ends with a **Bottom Line / Key Takeaways** the reader can act on.
- [ ] Tone is conversational, clear, confident — not formal, not slangy, not cringe.

## Frontmatter

See the schema and field rules in [AGENTS.md](AGENTS.md#blog-authoring). In short: `title`, `description`, and `pubDate` are required; `description` should be a clear one-sentence summary of what the reader will get (it's used for SEO and post listings, so make it specific and useful, not generic).
