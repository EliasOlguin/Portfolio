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
      'Full-stack developer with an industrial background. React and TypeScript on the front, C#/.NET and SQL behind it.',
    story:
      'I started on a factory production line, learned to code at night and went on to build software used in that same operation.',
    rows: { frontend: 'Frontend', backend: 'Backend', data: 'Data', base: 'Base', open: 'Open to' },
    base: 'Cologne, Germany · EU citizen · available now',
    open: 'Full-stack roles · remote · relocation',
    cta: { cv: 'Download CV', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
  },
  metrics: {
    title: 'At a glance',
    items: [
      { kind: 'Role', value: '2022 – 2024', label: 'software developer at Newsan' },
      {
        kind: 'System scope',
        value: '6',
        label: 'factories use the traceability system I worked on',
      },
      {
        kind: 'Progression',
        value: '20 months',
        label: 'from the production line to software developer',
      },
    ],
  },
  experience: {
    title: 'Experience',
    role: 'Software Developer · Newsan',
    place: 'Ushuaia, AR · Apr 2022 – Jan 2024 · 24/7 manufacturing environment',
    labels: {
      problem: 'Problem',
      contribution: 'My contribution',
      benefit: 'Operational benefit',
    },
    items: [
      {
        name: 'Production Traceability System · SPP module',
        problem:
          'The previous Visual Basic desktop app had models and validations hard-coded, so every model change meant editing code by hand.',
        contribution:
          'In a traceability system used in 6 factories, I was responsible for SPP, its core configuration and validation module (schema, business logic, regex checks). I also joined the on-site rollout in Buenos Aires.',
        benefit:
          'Model changes and validation rules became configuration instead of code changes. Assembly errors are caught before units move on, and supervisors, engineering and management use it daily.',
      },
      {
        name: 'ESD Safety Control',
        problem: 'ESD safety checks at critical workstations were recorded with pen and paper.',
        contribution:
          'I built it end to end: business logic, database, personnel management and integration with a Raspberry Pi test rig (Good / No Good results).',
        benefit:
          'A digital record per shift replaced the paper log: it shows automatically who has done the check and who has not, updates staff at shift change and sends supervisors a daily report.',
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
    howItWorks: 'How it works',
    zoom: 'Enlarge screenshot',
    close: 'Close',
    liveNote: 'Free hosting: the first load can take up to a minute.',
    doneToday: {
      description:
        'A habit tracker: schedule habits, check them off each day and follow your streaks. In English, Spanish and German.',
      meta: 'Since Oct 2026 · v1.2.2 · live',
      steps: [
        'Today shows the habits scheduled for the day; one tap marks them done.',
        'Each habit keeps its current and best streak.',
        'Statistics show weekly totals, a daily completion chart and a breakdown by habit.',
      ],
      highlights: [
        'Per-user time zones: schedules and streaks follow each user’s own day.',
        'Account security: 2FA, CSRF protection and email confirmation.',
        'Tested streak and scheduling logic (xUnit) and versioned releases.',
      ],
      shot: 'DoneToday Today screen: three habits to check off with their current and best streak, plus this week’s completion rate and daily chart',
    },
    recycleApp: {
      description:
        'For people new to Germany’s sorting rules: photograph an item before throwing it away and get the right bin for your city.',
      meta: 'Since Oct 2026 · in development',
      steps: [
        'Take a photo of the item.',
        'Get the right bin for your city; items made of several materials get an answer per part.',
        'Report a wrong answer anonymously, so the rules can be corrected.',
      ],
      highlights: [
        'The vision model only identifies the item; your city’s rules in the database decide the bin.',
        'The API key stays on the backend, and photos are analysed but not stored.',
        'Draft rules for Köln, Düsseldorf and Berlin, each marked by how it was checked against official sources.',
      ],
      shot: 'Two recycle-app screens: a cookie box split into the blue paper bin and the yellow packaging bin, and a question about the colour of a glass jar',
    },
  },
  path: {
    title: 'Path',
    stations: [
      { title: 'Brazing welder', note: '2020 · Ushuaia' },
      { title: 'Repair technician', note: '2021 · led a junior' },
      { title: 'Software developer', note: '2022 · Newsan' },
      { title: 'Cologne', note: '2024 – now · EU citizen' },
    ],
    since: 'Since 2024',
    story:
      'I moved to Germany and completed the process to have my Italian (EU) citizenship recognised, which included five months in Italy. Meanwhile I have been building personal projects, including DoneToday and recycle-app, and improving my English.',
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
    text: 'Currently in Cologne, Germany. Open to full-stack opportunities, remote work and relocation.',
    email: 'Email me',
  },
  footer: { built: 'built with React, TypeScript & mate' },
}
