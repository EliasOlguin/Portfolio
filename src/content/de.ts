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
          'Produktionsprozesse wurden in einem langsamen, starren Desktop-Altsystem konfiguriert und validiert.',
        contribution:
          'Innerhalb eines Rückverfolgungssystems, das in 6 Werken genutzt wird, war ich für SPP verantwortlich, das Kernmodul zur Konfiguration und Validierung der Produktion: Datenbankschema, Geschäftslogik und konfigurierbare Regex-Regeln, die Bauteilcodes prüfen. Außerdem habe ich bei der Einführung vor Ort in Buenos Aires mitgearbeitet.',
        benefit:
          'Montagefehler werden erkannt, bevor ein Gerät weiterläuft, und der Wechsel zu einer Webanwendung hat Validierung, Konfiguration und Transparenz über alle Linien verbessert. Schichtleitung, Engineering und Produktionsmanagement nutzen es täglich.',
      },
      {
        name: 'ESD-Sicherheitskontrolle',
        problem: 'Der ESD-Schutz an kritischen Arbeitsplätzen musste überwacht werden.',
        contribution:
          'Ich habe die Anwendung End-to-End entwickelt: Geschäftslogik, Datenbank, Personalverwaltung und Validierungsabläufe, angebunden an einen Raspberry-Pi-Prüfstand, der Good-/No-Good-Ergebnisse liefert.',
        benefit:
          'Eine schichtbasierte Logik zeigt, wer die ESD-Prüfung noch durchführen muss, das Personal wird bei Schichtwechsel automatisch aktualisiert, und die Schichtleitung erhält einen täglichen Compliance-Bericht.',
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
      shot: 'Anmeldeseite von DoneToday mit dem Slogan „Little habits. More you.“',
    },
    recycleApp: {
      description:
        'Für alle, die die deutschen Trennregeln noch nicht kennen: Gegenstand vor dem Wegwerfen fotografieren und erfahren, in welche Tonne er in der eigenen Stadt gehört.',
      meta: 'Seit Okt. 2026 · in Entwicklung',
      steps: [
        'Gegenstand fotografieren.',
        'Das Bildmodell erkennt nur, was es ist, aus einer festen Liste von Kategorien.',
        'Die Regeln der Stadt entscheiden über die Tonne; bei mehreren Materialien gibt es eine Antwort pro Teil.',
      ],
      highlights: [
        'Der API-Schlüssel bleibt im Backend, Fotos werden analysiert, aber nicht gespeichert.',
        'Regelentwürfe für Köln, Düsseldorf und Berlin, jeweils markiert, wie sie mit offiziellen Quellen geprüft wurden.',
        'Anonymes Feedback, um falsche Antworten zu korrigieren.',
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
      'Ich bin nach Deutschland gezogen und habe meine italienische (EU-)Staatsbürgerschaft abgeschlossen, wofür ich fünf Monate in Italien war. Parallel habe ich eigene Projekte entwickelt, etwa die beiden oben, und mein Englisch verbessert.',
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
