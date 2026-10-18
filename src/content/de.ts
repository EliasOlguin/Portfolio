import type { Content } from './types'

// Needs review by a native speaker before launch.
export const de: Content = {
  nav: { skip: 'Zum Inhalt springen', language: 'Sprache' },
  hero: {
    headline:
      'Full-Stack-Entwickler. React und TypeScript im Frontend, C#/.NET und SQL dahinter, im Produktionseinsatz.',
    rows: { frontend: 'Frontend', backend: 'Backend', data: 'Daten', base: 'Standort' },
    base: 'Köln, DE · EU-Bürger · sofort verfügbar',
    cta: { cv: 'Lebenslauf', github: 'GitHub', linkedin: 'LinkedIn', email: 'E-Mail' },
  },
  metrics: {
    title: 'Auf einen Blick',
    items: [
      { value: '2 J.', label: 'Berufserfahrung Full-Stack' },
      { value: '6', label: 'Werke nutzen mein System' },
      { value: '24/7', label: 'Produktionsumgebung' },
      { value: '2×', label: 'leistungsbezogen befördert' },
    ],
  },
  experience: {
    title: 'Erfahrung',
    role: 'Softwareentwickler · Newsan',
    place: 'Ushuaia, AR · 2022 – 2024',
    items: [
      {
        name: 'Produktionsrückverfolgung (SPP)',
        text: 'Verantwortlich für das Kernmodul, das die Produktion in 6 Werken konfiguriert und validiert. Datenbankschema und Regex-Validierungsregeln entworfen, die Montagefehler erkennen, bevor ein Gerät weiterläuft. Ablösung eines langsamen Desktop-Altsystems und Einführung vor Ort in Buenos Aires.',
      },
      {
        name: 'ESD-Sicherheitskontrolle',
        text: 'End-to-End-Anwendung zur Prüfung des ESD-Schutzes an kritischen Arbeitsplätzen: Raspberry-Pi-Prüfstände, schichtbasierte Logik, die zeigt, wer noch prüfen muss, und tägliche Compliance-Berichte für die Schichtleitung.',
      },
    ],
  },
  projects: {
    title: 'Projekte',
    live: 'Live',
    code: 'Code',
    video: 'Demo-Video',
    play: 'Abspielen',
    doneToday: {
      description:
        'Ein Habit-Tracker mit Streaks, Statistiken, 2FA und Google-Login, in 3 Sprachen.',
      highlights: [
        'Zeitzone pro Nutzer: Zeitpläne und Streaks folgen dem eigenen Tag.',
        'Kontosicherheit: 2FA, CSRF-Schutz und E-Mail-Bestätigung.',
        'Getestete Streak- und Planungslogik (xUnit) und versionierte Releases.',
      ],
    },
    recycleApp: {
      description:
        'Gegenstand fotografieren und erfahren, in welche Tonne er gehört, nach den Regeln der eigenen Stadt.',
      highlights: [
        'Der KI-Bildaufruf läuft im Backend, der API-Schlüssel ist nie in der App.',
        'Stadtspezifische Trennregeln über der Antwort des Modells.',
        'Anonymes Feedback, um falsche Antworten zu korrigieren.',
      ],
    },
  },
  path: {
    title: 'Werdegang',
    stations: [
      { title: 'Hartlöter', note: '2020 · Ushuaia' },
      { title: 'Reparaturtechniker', note: '2021 · Junior betreut' },
      { title: 'Softwareentwickler', note: '2022 · Newsan' },
      { title: 'Köln', note: '2024 · EU-Bürger' },
    ],
    story:
      'Ich habe in der Fertigung angefangen, abends programmieren gelernt und am Ende die Software gebaut, mit der meine alte Linie lief.',
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
    text: 'Offen für Full-Stack-Rollen in Köln / NRW oder remote.',
    email: 'Schreib mir',
  },
  footer: { built: 'gebaut mit React, TypeScript & Mate' },
}
