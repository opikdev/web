---
title: 'Why I Built My Blog with Astro and Decap CMS'
description: 'Discover why Astro is perfect for simple blogs and how Decap CMS provides Git-based content management without databases or complex setups. A practical guide to building fast, maintainable blogs.'
pubDate: '2025-12-28'
heroImage: '/images/blog/why-astro-and-decap-cms.webp'
tags: ['web-development', 'astro', 'decap-cms']
---

I spent way too much time thinking about how to build this blog. Should I use Next.js? Gatsby? Just write HTML? After building a few prototypes, I settled on Astro with Decap CMS for content management. Here's why that decision made sense, and why it might work for you too.

## The Problem with Most Blog Setups

Most static site generators feel like overkill for a simple blog. They come with React, complex build processes, and JavaScript bundles that add weight to every page. For a blog that's mostly text and images, that overhead doesn't make sense.

I wanted something fast, simple, and maintainable. I also needed a way to write and edit posts without touching code every time. That's where the combination of Astro and Decap CMS comes in.

## Why Astro Works for a Simple Blog

**Zero JavaScript by default.** Astro ships zero JavaScript by default. When you build a page, it renders everything to static HTML. No React runtime, no hydration overhead, just fast-loading pages. For a blog where most pages are just content, this is exactly what you want.

**Islands architecture for selective interactivity.** The islands architecture lets you add interactivity exactly where needed. On my blog page, search and filtering get JavaScript. The rest stays static. This selective approach keeps performance high while allowing dynamic features when they matter.

**Content collections with TypeScript.** Content collections make managing posts straightforward. You write markdown files with frontmatter, and Astro handles type checking and routing. TypeScript support means you catch errors at build time, not when someone visits a broken page. The developer experience is clean without unnecessary complexity.

**Static output for maximum performance.** The build output is just static files. No server needed. No database queries. Pages load instantly because there's nothing to wait for. Search engines index everything easily since it's all plain HTML. For a content-focused site, this simplicity translates directly to better performance and SEO.

## Adding Decap CMS for Content Management

Writing posts in markdown files works, but it's not ideal for everyone. Sometimes you want to write without opening a code editor. Sometimes you need to update a post quickly. That's where **Decap CMS** fits in.

**Git-based content management.** Decap CMS is a Git-based content management system. It provides a web interface to create and edit posts, but everything still lives in your repository as markdown files. No database, no API calls, no separate content system to maintain. Just a UI that writes to the same files you'd edit manually.

**Quick setup process.** The setup takes about ten minutes:
- Add an admin folder to your public directory
- Include an HTML file and a config file
- The config defines your content structure
- The CMS generates forms based on that structure

When you publish a post, it commits the changes to your Git repository. Your build process picks it up, and the new post goes live.

**Version control for content.** This approach keeps your content in version control. Every change is tracked. You can review edits before they go live. You can roll back if something breaks. It's the workflow of a developer tool with the convenience of a content management system. Non-technical team members can write posts through the web interface, while developers can still edit files directly when needed.

## How It Works Together

Astro's content collections API handles the blog structure. Each post is a markdown file with YAML frontmatter for metadata like title, description, and publish date. The CMS writes these files with the same format, so everything stays consistent.

The build process is straightforward. Astro reads the markdown files, generates static HTML, and outputs a site ready to deploy. No server needed. No database queries. Just files that can be served from any static hosting provider.

Decap CMS integrates through a static admin interface served from your public folder. The config file defines your content structure with fields, widgets, and validation rules. The CMS generates forms based on that structure. When you save a post, it writes the markdown file to your repository through Git Gateway. The next build includes that new content automatically.

## What This Setup Gets You

**Fast performance.** Astro's zero-JavaScript approach means pages load quickly. Core Web Vitals scores are good because there's less to download and parse. Search engines can index everything easily since it's all static HTML.

**Simple workflow.** Write posts in the CMS, or edit markdown files directly. Both approaches work. The content lives in your repository, so you can use Git workflows for review and collaboration. Pull requests become content reviews.

**Easy maintainability.** The stack is straightforward:
- Astro handles site generation
- Decap CMS handles the content interface
- Both are well-documented and actively maintained
- No complex architecture to understand or maintain

**Future flexibility.** Need to add a feature? Astro's component system makes it easy. Want to change how posts are displayed? Update the template. The content stays in markdown, so you're not locked into a specific presentation. You can migrate to a different static site generator later if needed.

## When This Approach Makes Sense

This setup works well for **content-focused sites**:
- Blogs
- Documentation sites
- Portfolios
- Marketing pages

Anything where most of the value is in the content, not in complex interactivity.

**Good fit if you want:**
- Performance without sacrificing developer experience
- Content management without a database
- Modern tooling with TypeScript support
- Git-based workflows for content

**Ideal if you're comfortable with Git.** The CMS makes it accessible to non-developers, but the underlying system is still Git-based. If your team needs advanced user roles and permissions, you might want to consider a traditional CMS like WordPress or Drupal, or a headless CMS with robust permission systems.

## The Trade-offs

**Limited client-side interactivity.** If you need heavy client-side interactivity everywhere, Astro might not be the best choice. The islands architecture works great for selective interactivity, but if everything needs to be dynamic, a full React app might be simpler.

**Git Gateway requirement.** The CMS requires Git Gateway for authentication, which means you need a hosting setup that supports it. Netlify makes this easy with built-in support. Other platforms might need more configuration or a self-hosted Git Gateway setup.

**Git knowledge assumed.** The workflow assumes some comfort with Git. If you're working with people who aren't familiar with version control, the CMS helps, but the underlying concept is still Git-based. Content changes create commits, which might be confusing for non-technical users.

**Build process bottleneck.** For high-traffic sites with frequent updates, the Git-based workflow can become a bottleneck. Every content change triggers a build, which might not scale well for sites that need instant publishing.

## When Not to Use This Stack

**Don't use this if you need:**
- **Real-time content updates** - The Git-based workflow means changes go through a build process, which takes time. If you need instant publishing, a traditional CMS with a database is better.
- **Complex user permissions** - Decap CMS is simple, but it doesn't have the advanced permission systems you'd find in WordPress or Drupal.
- **Heavy client-side interactivity** - While Astro's islands architecture works well, if most of your site needs to be dynamic, a full React or Next.js app might be simpler to build and maintain.

## Bottom Line

Astro gives me a fast, simple way to build a blog. Decap CMS gives me a way to manage content without adding complexity. Together, they solve the problem of building and maintaining a content site without over-engineering it.

The best tool is the one that solves your actual problem. For a blog focused on content, this combination works. It stays out of the way when you're writing, and it's powerful enough when you need to add features.

If you're building something similar, give this stack a look. Sometimes the simplest solution is the right one. The setup is straightforward, the performance is excellent, and the workflow fits how I actually work. That's what matters most.

