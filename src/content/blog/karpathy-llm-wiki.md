---
title: 'Karpathy''s LLM Wiki: Knowledge That Finally Compounds'
description: 'Andrej Karpathy posted a GitHub Gist and the internet lost it — 17 million views in days. The "LLM Wiki" is a deceptively simple idea: stop re-searching your docs, and let the model build a wiki instead.'
pubDate: '2026-04-08'
heroImage: '/images/blog/llm-wiki.webp'
tags: ['ai', 'llm', 'knowledge', 'rag']
---

Andrej Karpathy posted a markdown file to a GitHub Gist. Within days it had 17 million views, thousands of stars, hundreds of forks, and a wave of re-implementations.

No product. No paper. Just an idea, written down clearly enough that people immediately wanted to build it. That's a rare kind of influence — and the idea is worth understanding, because it quietly fixes something most of us have stopped noticing.

## The problem it names

Here's the frustration the LLM Wiki puts its finger on: **the more you read, the less you remember — and every LLM session starts from zero.**

We've been papering over this with RAG. You index a pile of documents, and when you ask a question, the system retrieves the relevant chunks and stuffs them into the prompt. It works, but it has a deep flaw: **nothing accumulates.** Ask a subtle question that needs five documents synthesized, and the model finds and re-pieces those fragments *every single time*. No memory of having done it before. No structure that gets richer with use. Just retrieval, forever, from scratch.

## The idea: let the LLM keep a wiki

Karpathy's move is to flip what gets stored. Instead of indexing raw documents for retrieval, you have the LLM **compile** those documents into a persistent, structured wiki — a directory of interconnected markdown files that the model writes and maintains.

When you add a new source, the LLM doesn't just index it. It:

- reads it and extracts the key information,
- creates or updates **entity pages** and **concept pages**,
- notes where the new source **contradicts** existing claims,
- and maintains **cross-references** across the whole wiki.

The wiki compounds. Every source you add and every question you ask makes it richer. The model does the tedious bookkeeping; you curate sources and ask questions. The framing that stuck is his: **"Obsidian is the IDE, the LLM is the programmer, the wiki is the codebase."** You explore and ask; the model maintains the database.

If that sounds related to the [self-improving agents I wrote about](/blog/hermes-the-agent-that-learns/), it is — same instinct, different shape. Knowledge that builds on itself instead of resetting.

## Why it hit so hard

A markdown file doesn't get 17 million views by accident. A few reasons it landed.

**It's copy-pasteable.** This wasn't a framework to install or a service to sign up for. It's an "idea file" you paste into Claude Code or Codex and start using. The distance from "read it" to "try it" was about thirty seconds.

**It reframes a problem everyone has.** Anyone doing serious research with LLMs has felt the amnesia. Karpathy didn't invent note-taking; he named *why* the current tools feel leaky and offered a clean mental model for fixing it.

**It's a pattern, not a product — so everyone could own it.** Within two weeks there were dozens of re-implementations, write-ups, and even SaaS products built around it. An idea with no walls spreads faster than any launch.

## The honest caveats

The hype framed this as "RAG is dead." It isn't, and the pattern has real limits worth stating.

**It's not free — the LLM does a lot of work.** Every source ingested means the model reads, extracts, reconciles, and rewrites pages. That's tokens and time on every addition, not a one-time index. For large or fast-moving corpora, that cost adds up.

**Compiled knowledge can compile errors.** If the model misreads a source or resolves a contradiction the wrong way, that mistake becomes a confident wiki page that future answers build on. RAG's rawness is sometimes a feature — it doesn't pre-decide what's true. The wiki does, and you have to trust its judgment or check it.

**RAG isn't dead; the use cases differ.** For huge, volatile document sets where freshness matters more than synthesis, retrieval still wins. The wiki shines for a curated, growing body of knowledge you return to and reason over — a second brain, not a search engine.

## Bottom Line

The LLM Wiki is a small idea with a big consequence: knowledge that compounds instead of resetting.

- **What it is:** a pattern (a Karpathy Gist) where the LLM compiles your sources into a persistent, cross-referenced markdown wiki — entity pages, concepts, contradictions, links — and maintains it for you.
- **Why it spread:** copy-pasteable, names a problem everyone feels, and it's an open pattern anyone can own — hence 17M views and a swarm of implementations.
- **The honest version:** it costs real tokens per source, it can bake in errors as confident pages, and it complements RAG rather than killing it.

The deeper point is the one worth keeping: the bottleneck in working with LLMs was never retrieval. It was *memory* — knowledge that builds. Karpathy just handed everyone a clean, ownable way to start building it.
