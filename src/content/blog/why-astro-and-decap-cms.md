---
title: 'Why I Built My Blog with Astro and Decap CMS'
description: 'Why Astro is a great fit for a simple blog, and how Decap CMS gives you Git-based content management with no database. A practical look at building a fast, maintainable blog.'
pubDate: '2025-12-28'
heroImage: '/images/blog/why-astro-and-decap-cms.webp'
tags: ['web-development', 'astro', 'decap-cms']
---

I spent way too long deciding how to build this blog. Next.js? Gatsby? Just write HTML? After a few prototypes I settled on Astro with Decap CMS, and here's why that made sense.

## The problem with most blog setups

Most static site generators feel like overkill for a simple blog. They drag in React, complex build steps, and JavaScript bundles that weigh down every page. For a site that's mostly text and images, that overhead doesn't earn its keep.

I wanted three things: fast, simple, maintainable. I also wanted to write and edit posts without opening a code editor every time. That combination is exactly where Astro and Decap fit.

## Why Astro fits a content site

**Zero JavaScript by default.** Astro renders everything to static HTML. No React runtime, no hydration cost, just fast pages. For a blog where most pages are pure content, that's exactly right.

**Islands for the few interactive bits.** The islands architecture lets you add JavaScript only where you need it. My blog index gets search and filtering; everything else stays static. High performance without giving up dynamic features where they matter.

**Content collections with TypeScript.** Posts are markdown files with frontmatter, and Astro handles type-checking and routing. You catch a bad post at build time instead of when a visitor hits a broken page.

**Static output.** The build is just files. No server, no database queries, instant loads, and trivial for search engines to index. For a content site, that simplicity is the whole point.

## Where Decap comes in

Writing markdown files works, but it isn't ideal for everyone, or for every moment. Sometimes you want to write without a code editor, or fix a typo from your phone. Decap CMS handles that.

It's a Git-based CMS: a web interface to create and edit posts, where everything still lives in your repo as markdown. No database, no separate content system, just a UI that writes to the same files you'd edit by hand. Setup is about ten minutes: drop an admin folder in `public/`, add an HTML file and a config that defines your content structure, and the CMS generates forms from it. Publishing commits to your repo, your build picks it up, and the post goes live.

The nice side effect is that your content lives in version control. Every change is tracked, you can review edits before they ship, and you can roll back if something breaks. Pull requests become content reviews.

## When this stack is a good fit

It works well for content-focused sites: blogs, docs, portfolios, marketing pages. Anything where the value is in the content, not in heavy interactivity. You're a good candidate if you want performance without sacrificing developer experience, content management without a database, modern tooling with TypeScript, and Git-based workflows.

## The tradeoffs

It's not free of catches, and a few are worth knowing up front:

- **Limited client-side interactivity.** Islands are great for selective dynamism. If your whole site needs to be dynamic, a full React app is probably simpler.
- **Git Gateway requirement.** The CMS needs Git Gateway for auth. Netlify makes this trivial; other hosts need more setup.
- **Git knowledge is assumed.** The CMS helps non-developers, but content changes are still commits underneath, which can confuse people unfamiliar with version control.
- **The build is a bottleneck at scale.** Every content change triggers a rebuild. For high-traffic sites that publish constantly, that lag matters, and a database-backed CMS is the better call.

If you need real-time publishing or advanced user permissions, look at WordPress, Drupal, or a headless CMS with robust roles instead.

## The short version

Astro gives me a fast, simple way to build a blog. Decap lets me manage content without adding complexity. Together they solve building and maintaining a content site without over-engineering it.

The best tool is the one that fits your actual problem. For a content-first blog, this one stays out of the way when I'm writing and has room to grow when I need it. If you're building something similar, it's worth a look.
