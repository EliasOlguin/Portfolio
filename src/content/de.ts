import type { Content } from './types'

// Needs review by a native speaker before launch.
export const de: Content = {
  nav: {
    skip: 'Zum Inhalt springen',
    language: 'Sprache',
    stack: 'Technologien',
    sections: 'Abschnitte',
    contact: 'Kontakt',
  },
  hero: {
    headline:
      'Full-Stack-Entwickler mit Industrieerfahrung. React und TypeScript im Frontend, C#/.NET und SQL dahinter.',
    story:
      'Ich habe an einer Produktionslinie angefangen, abends programmieren gelernt und schließlich Software entwickelt, die in genau diesem Betrieb im Einsatz ist.',
    rows: {
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Daten',
      base: 'Standort',
      open: 'Offen für',
    },
    base: 'Köln, Deutschland · EU-Bürger · sofort verfügbar',
    open: 'Full-Stack-Rollen · Remote · Umzug',
    cta: { cv: 'Lebenslauf', github: 'GitHub', linkedin: 'LinkedIn', email: 'E-Mail' },
  },
  metrics: {
    title: 'Auf einen Blick',
    items: [
      { kind: 'Rolle', value: '2022 – 2024', label: 'Softwareentwickler bei Newsan' },
      {
        kind: 'Systemumfang',
        value: '6',
        label: 'Werke nutzen das Rückverfolgungssystem, an dem ich gearbeitet habe',
      },
      {
        kind: 'Entwicklung',
        value: '20 Monate',
        label: 'von der Produktionslinie zum Softwareentwickler',
      },
    ],
  },
  experience: {
    title: 'Erfahrung',
    role: 'Softwareentwickler · Newsan',
    place: 'Ushuaia, AR · Apr. 2022 – Jan. 2024 · Fertigung im 24/7-Betrieb',
    labels: {
      problem: 'Problem',
      contribution: 'Mein Beitrag',
      benefit: 'Nutzen im Betrieb',
    },
    items: [
      {
        name: 'Produktionsrückverfolgung · SPP-Modul',
        problem:
          'Die bisherige Desktop-Anwendung in Visual Basic hatte Modelle und Prüfungen fest im Code: Jeder Modellwechsel bedeutete eine manuelle Codeänderung.',
        contribution:
          'In einem Rückverfolgungssystem für 6 Werke war ich für SPP verantwortlich, das Kernmodul für Konfiguration und Validierung (Schema, Geschäftslogik, Regex-Prüfungen). Bei der Einführung in Buenos Aires war ich vor Ort.',
        benefit:
          'Modellwechsel und Prüfregeln sind Konfiguration statt Codeänderung. Montagefehler werden erkannt, bevor ein Gerät weiterläuft; Schichtleitung, Engineering und Management nutzen es täglich.',
      },
      {
        name: 'ESD-Sicherheitskontrolle',
        problem:
          'ESD-Prüfungen an kritischen Arbeitsplätzen wurden mit Stift und Papier dokumentiert.',
        contribution:
          'Ich habe sie End-to-End entwickelt: Geschäftslogik, Datenbank, Personalverwaltung und Anbindung an einen Raspberry-Pi-Prüfstand (Good / No Good).',
        benefit:
          'Eine digitale Erfassung pro Schicht ersetzte das Papier: Sie zeigt automatisch, wer geprüft hat und wer nicht, aktualisiert das Personal bei Schichtwechsel und liefert einen täglichen Bericht.',
      },
    ],
  },
  projects: {
    title: 'Projekte',
    live: 'Live',
    code: 'Code',
    video: 'Demo-Video',
    play: 'Abspielen',
    pause: 'Pausieren',
    howItWorks: 'So funktioniert es',
    zoom: 'Screenshot vergrößern',
    close: 'Schließen',
    liveNote: 'Kostenloses Hosting: Der erste Aufruf kann bis zu einer Minute dauern.',
    doneToday: {
      description:
        'Ein Habit-Tracker: Gewohnheiten planen, täglich abhaken und Streaks verfolgen. Auf Deutsch, Englisch und Spanisch.',
      meta: 'Seit Okt. 2026 · v1.2.2 · live',
      steps: [
        'Heute zeigt die für den Tag geplanten Gewohnheiten; ein Tipp hakt sie ab.',
        'Jede Gewohnheit hat ihren aktuellen und ihren besten Streak.',
        'Statistiken zeigen Wochensummen, ein tägliches Erfüllungsdiagramm und eine Aufschlüsselung pro Gewohnheit.',
      ],
      highlights: [
        'Zeitzone pro Nutzer: Zeitpläne und Streaks folgen dem eigenen Tag.',
        'Kontosicherheit: 2FA, CSRF-Schutz und E-Mail-Bestätigung.',
        'Getestete Streak- und Planungslogik (xUnit) und versionierte Releases.',
      ],
      shot: 'DoneToday-Ansicht Heute: drei Gewohnheiten zum Abhaken mit aktuellem und bestem Streak, dazu die Wochenquote und das Tagesdiagramm (englische Oberfläche)',
    },
    recycleApp: {
      description:
        'Für alle, die die deutschen Trennregeln noch nicht kennen: Gegenstand vor dem Wegwerfen fotografieren und erfahren, in welche Tonne er in der eigenen Stadt gehört.',
      meta: 'Seit Okt. 2026 · in Entwicklung',
      steps: [
        'Gegenstand fotografieren.',
        'Die passende Tonne für die eigene Stadt sehen; bei mehreren Materialien gibt es eine Antwort pro Teil.',
        'Falsche Antworten anonym melden, damit die Regeln korrigiert werden können.',
      ],
      highlights: [
        'Das Bildmodell erkennt nur den Gegenstand; die Regeln der eigenen Stadt in der Datenbank entscheiden über die Tonne.',
        'Der API-Schlüssel bleibt im Backend, Fotos werden analysiert, aber nicht gespeichert.',
        'Regelentwürfe für Köln, Düsseldorf und Berlin, jeweils markiert, wie sie mit offiziellen Quellen geprüft wurden.',
      ],
      shot: 'Zwei Screens von recycle-app: eine Keksschachtel, aufgeteilt in die blaue Papiertonne und die gelbe Wertstofftonne, und eine Frage nach der Farbe eines Glases',
    },
  },
  path: {
    title: 'Werdegang',
    stations: [
      { title: 'Hartlöter', note: '2020 · Ushuaia' },
      { title: 'Reparaturtechniker', note: '2021 · Junior betreut' },
      { title: 'Softwareentwickler', note: '2022 · Newsan' },
      { title: 'Köln', note: '2024 – heute · EU-Bürger' },
    ],
    since: 'Seit 2024',
    story:
      'Ich bin nach Deutschland gezogen und habe das Verfahren zur Anerkennung meiner italienischen Staatsbürgerschaft abgeschlossen; dafür war ich fünf Monate in Italien. Parallel habe ich eigene Projekte entwickelt, darunter DoneToday und recycle-app, und mein Englisch verbessert.',
  },
  education: {
    title: 'Ausbildung',
    items: [
      { name: 'Diplom Back End · C# & .NET', year: '2021' },
      { name: 'Full-Stack-Programm · UTN', year: '2022' },
      { name: 'Diplom Frontend · Angular & JavaScript', year: '2022' },
    ],
  },
  languages: {
    title: 'Sprachen',
    items: [
      { name: 'Spanisch', level: 'Muttersprache' },
      { name: 'Englisch', level: 'B2 · berufstauglich' },
      { name: 'Deutsch', level: 'A1 · lerne ich' },
    ],
  },
  contact: {
    headline: 'Lass uns etwas bauen.',
    text: 'Derzeit in Köln, Deutschland. Offen für Full-Stack-Stellen, Remote-Arbeit und einen Umzug.',
    email: 'Schreib mir',
  },
  footer: { built: 'gebaut mit React, TypeScript & Mate' },
}
