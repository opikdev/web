import type { ImageMetadata } from 'astro';
import p1 from '../assets/posts/post-1.png';
import p2 from '../assets/posts/post-2.png';
import p3 from '../assets/posts/post-3.png';
import p4 from '../assets/posts/post-4.png';
import p5 from '../assets/posts/post-5.png';
import p6 from '../assets/posts/post-6.png';
import p7 from '../assets/posts/post-7.png';
import p8 from '../assets/posts/post-8.png';

export type Post = {
  title: string;
  slug: string;
  topic: 'AI' | 'Engineering' | 'Product' | 'Notes';
  date: string;
  readingMinutes: number;
  cover: ImageMetadata;
};

export const posts: Post[] = [
  {
    title: 'They asked for AI. They needed a spreadsheet.',
    slug: 'they-asked-for-ai',
    topic: 'AI',
    date: '2026-08-14',
    readingMinutes: 6,
    cover: p1,
  },
  {
    title: 'When an AI feature earns its place',
    slug: 'when-an-ai-feature-earns-its-place',
    topic: 'AI',
    date: '2026-07-14',
    readingMinutes: 9,
    cover: p2,
  },
  {
    title: "Automation that isn't AI, and usually shouldn't be",
    slug: 'automation-that-isnt-ai',
    topic: 'Engineering',
    date: '2026-05-19',
    readingMinutes: 4,
    cover: p3,
  },
  {
    title: 'Code you can still read after a year away',
    slug: 'code-you-can-still-read',
    topic: 'Engineering',
    date: '2026-03-20',
    readingMinutes: 7,
    cover: p4,
  },
  {
    title: 'Four questions I ask before quoting a project',
    slug: 'four-questions-before-quoting',
    topic: 'Product',
    date: '2026-02-12',
    readingMinutes: 5,
    cover: p5,
  },
  {
    title: 'Leading engineers and solution consultants in one squad',
    slug: 'leading-engineers-and-solution-consultants',
    topic: 'Notes',
    date: '2025-11-28',
    readingMinutes: 8,
    cover: p6,
  },
  {
    title: 'Eighteen years of front-end, and what actually stuck',
    slug: 'eighteen-years-of-front-end',
    topic: 'Notes',
    date: '2025-10-03',
    readingMinutes: 6,
    cover: p7,
  },
  {
    title: 'What a year of selling small apps actually paid',
    slug: 'what-a-year-of-selling-small-apps-paid',
    topic: 'Product',
    date: '2025-08-15',
    readingMinutes: 11,
    cover: p8,
  },
];
