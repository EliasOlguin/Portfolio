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
          'The previous desktop app, written in Visual Basic, had models and validations hard-coded: every model change, and every model and serial-number check, had to be updated by hand.',
        contribution:
          'Within a traceability system used in 6 factories, I was responsible for SPP, the core module for configuring and validating production: database schema, business logic and configurable regex rules that check component codes against a combined format (fields such as model, year, serial number and plant). I also took part in the on-site rollout in Buenos Aires.',
        benefit:
          'Model changes and validation rules became configuration instead of code changes, so the process turned dynamic. Assembly errors are caught before units move down the line. Supervisors, engineering and production management use it daily.',
      },
      {
        name: 'ESD Safety Control',
        problem: 'ESD safety checks at critical workstations were recorded with pen and paper.',
        contribution:
          'I built the application end to end: business logic, database, personnel management and validation flows, integrated with a Raspberry Pi test rig that reports Good / No Good results.',
        benefit:
          'A rigorous digital record replaced the paper log: the app detects automatically, for each shift, who has done the ESD check and who has not, updates personnel at shift change and gives supervisors a daily compliance report.',
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
        'The vision model only identifies what it is, from a fixed list of categories.',
        'Your city’s rules decide the bin; items made of several materials get an answer per part.',
      ],
      highlights: [
        'The API key stays on the backend, and photos are analysed but not stored.',
        'Draft rules for Köln, Düsseldorf and Berlin, each marked by how it was checked against official sources.',
        'Anonymous feedback to correct wrong answers.',
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
      'I moved to Germany and completed my Italian (EU) citizenship, including five months in Italy for the process. In parallel I have been building personal projects, such as the two above, and improving my English.',
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
