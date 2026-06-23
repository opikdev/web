---
title: 'Karpathy''s LLM Wiki: Knowledge That Finally Compounds'
description: 'Andrej Karpathy posted a GitHub Gist and the internet lost it: 17 million views in days. The "LLM Wiki" is a deceptively simple idea: stop re-searching your docs, and let the model build a wiki instead.'
pubDate: '2026-04-08'
heroImage: '/images/blog/llm-wiki.webp'
tags: ['ai', 'llm', 'knowledge', 'rag']
---

Andrej Karpathy posted a markdown file to a GitHub Gist. Within days it had 17 million views, thousands of stars, hundreds of forks, and a wave of re-implementations.

No product, no paper. Just an idea, written down clearly enough that people immediately wanted to build it. That's a rare kind of influence, and the idea is worth understanding, because it quietly fixes something most of us stopped noticing.

## The problem it names

The frustration the LLM Wiki puts its finger on: the more you read, the less you remember, and every LLM session starts from zero.

We've been papering over this with RAG. You index a pile of documents, and when you ask a question, the system retrieves the relevant chunks and stuffs them into the prompt. It works, but it has a deep flaw: nothing accumulates. Ask a subtle question that needs five documents synthesized, and the model finds and re-pieces those fragments *every single time*. No memory of having done it before. No structure that gets richer with use. Just retrieval, forever, from scratch.

## The idea

Karpathy's move is to flip what gets stored. Instead of indexing raw documents for retrieval, you have the LLM *compile* them into a persistent, structured wiki: a directory of interconnected markdown files that the model writes and maintains.

When you add a new source, the LLM doesn't just index it. It reads it, extracts the key information, creates or updates entity and concept pages, notes where the source contradicts existing claims, and maintains cross-references across the whole wiki. Every source you add and every question you ask makes it richer.

His framing is the one that stuck: "Obsidian is the IDE, the LLM is the programmer, the wiki is the codebase." You explore and ask; the model does the tedious bookkeeping. (If that sounds like the [self-improving agents I wrote about](/blog/hermes-the-agent-that-learns/), it's the same instinct in a different shape: knowledge that builds on itself instead of resetting.)

## Why it hit so hard

A markdown file doesn't get 17 million views by accident.

**It's copy-pasteable.** Not a framework to install or a service to sign up for. It's an idea file you paste into Claude Code or Codex and start using. About thirty seconds from "read it" to "try it."

**It reframes a problem everyone has.** Anyone doing serious research with LLMs has felt the amnesia. Karpathy didn't invent note-taking; he named *why* the current tools feel leaky and gave a clean mental model for fixing it.

**It's a pattern, not a product.** No walls, so everyone could own it. Within two weeks there were dozens of re-implementations, write-ups, and even SaaS products built around it.

## Where the hype oversteps

The framing going around was "RAG is dead." It isn't, and the pattern has real limits.

The LLM does a lot of work: every source ingested means reading, extracting, reconciling, and rewriting pages. That's tokens and time on every addition, not a one-time index, and it adds up fast for large or fast-moving corpora.

It can also compile errors. If the model misreads a source or resolves a contradiction the wrong way, that mistake becomes a confident wiki page that future answers build on. RAG's rawness is sometimes a feature: it doesn't pre-decide what's true. The wiki does, so you either trust its judgment or check it.

And RAG still wins for huge, volatile document sets where freshness beats synthesis. The wiki shines for a curated, growing body of knowledge you return to and reason over. A second brain, not a search engine.

The bottleneck in working with LLMs was never retrieval. It was memory, the kind that builds. Karpathy handed everyone a clean, ownable way to start building it, which is exactly why a one-file Gist out-traveled most product launches that month.
