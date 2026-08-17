import type { ImageMetadata } from 'astro';
import agentSkills from '../assets/work/agent-skills.png';
import midnightLime from '../assets/work/midnight-lime.png';
import comfy from '../assets/work/comfy.png';

export type WorkItem = {
  title: string;
  description: string;
  href: string;
  kind?: string;
  status?: string;
  cover?: ImageMetadata;
};

export const work: WorkItem[] = [
  {
    title: 'Agent Skills',
    description: 'Nine standards skills for AI coding agents.',
    href: 'https://github.com/opikdev/skills',
    kind: 'Open source',
    cover: agentSkills,
  },
  {
    title: 'Midnight Lime',
    description: 'A quiet dark theme for VS Code and seven terminals.',
    href: 'https://github.com/opikdev/midnight-lime-vscode-theme',
    kind: 'Theme',
    cover: midnightLime,
  },
  {
    title: 'Comfy',
    description: 'A theme built for endurance, derived from vision research.',
    href: 'https://github.com/opikdev/comfy-vscode-theme',
    kind: 'Theme',
    cover: comfy,
  },
  {
    title: 'Orbit',
    description: 'Desktop app for orchestrating AI agents.',
    href: '#',
    status: 'In progress',
  },
  {
    title: 'Artesis',
    description: 'Orbit, in the cloud.',
    href: '#',
    status: 'Planned',
  },
];
