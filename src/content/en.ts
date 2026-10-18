import type { Content } from './types'

export const en: Content = {
  nav: {
    skip: 'Skip to content',
    language: 'Language',
    stack: 'Stack',
    sections: 'Sections',
    contact: 'Contact',
  },
  hero: {
    headline:
      'Full-stack developer. React and TypeScript on the front, C#/.NET and SQL behind it, shipped to production.',
    rows: { frontend: 'Frontend', backend: 'Backend', data: 'Data', base: 'Base' },
    base: 'Cologne, DE · EU citizen · available now',
    cta: { cv: 'Download CV', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
  },
  metrics: {
    title: 'At a glance',
    items: [
      { value: '2 yrs', label: 'professional full-stack' },
      { value: '6', label: 'factories using my system' },
      { value: '24/7', label: 'production environment' },
      { value: '2×', label: 'promoted on merit' },
    ],
  },
  experience: {
    title: 'Experience',
    role: 'Software Developer · Newsan',
    place: 'Ushuaia, AR · 2022 – 2024',
    items: [
      {
        name: 'Production Traceability System (SPP)',
        text: 'Owned the core module that configures and validates production in 6 factories. Designed the database schema and the regex validation rules that catch assembly errors before units move down the line. Helped replace a slow legacy desktop system and rolled it out on site in Buenos Aires.',
      },
      {
        name: 'ESD Safety Control',
        text: 'Built an end-to-end app that checks anti-static safety at critical workstations: Raspberry Pi test rigs, shift-aware logic that shows who still needs to test, and daily compliance reports for supervisors.',
      },
    ],
  },
  projects: {
    title: 'Projects',
    live: 'Live',
    code: 'Code',
    video: 'Demo video',
    play: 'Play',
    pause: 'Pause',
    doneToday: {
      description:
        'A habit tracker with streaks, statistics, 2FA and Google sign-in, in 3 languages.',
      highlights: [
        'Per-user time zones: schedules and streaks follow each user’s own day.',
        'Account security: 2FA, CSRF protection and email confirmation.',
        'Tested streak and scheduling logic (xUnit) and versioned releases.',
      ],
    },
    recycleApp: {
      description:
        'Photograph an item and find out which bin it goes in, following the rules of your German city.',
      highlights: [
        'The AI vision call runs on the backend, so the API key never ships in the app.',
        'City-specific sorting rules on top of the model’s answer.',
        'Anonymous feedback to correct wrong answers.',
      ],
    },
  },
  path: {
    title: 'Path',
    stations: [
      { title: 'Brazing welder', note: '2020 · Ushuaia' },
      { title: 'Repair technician', note: '2021 · led a junior' },
      { title: 'Software developer', note: '2022 · Newsan' },
      { title: 'Cologne', note: '2024 · EU citizen' },
    ],
    story:
      'I started on the factory floor, learned to code at night, and ended up building the software my old line ran on.',
  },
  education: {
    title: 'Education',
    items: [
      { name: 'Back End Diploma · C# & .NET', year: '2021' },
      { name: 'Full Stack Program · UTN', year: '2022' },
      { name: 'Frontend Diploma · Angular & JavaScript', year: '2022' },
    ],
  },
  languages: {
    title: 'Languages',
    items: [
      { name: 'Spanish', level: 'native' },
      { name: 'English', level: 'B2 · professional' },
      { name: 'German', level: 'A1 · learning' },
    ],
  },
  contact: {
    headline: 'Let’s build something.',
    text: 'Open to full-stack roles in Cologne / NRW or remote.',
    email: 'Email me',
  },
  footer: { built: 'built with React, TypeScript & mate' },
}
