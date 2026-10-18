type Item = { name: string; problem: string; contribution: string; benefit: string }
type Project = {
  description: string
  meta: string
  steps: string[]
  highlights: string[]
  shot: string
}

export type Content = {
  nav: { skip: string; language: string; stack: string; sections: string; contact: string }
  hero: {
    headline: string
    story: string
    rows: { frontend: string; backend: string; data: string; base: string; open: string }
    base: string
    open: string
    cta: { cv: string; github: string; linkedin: string; email: string }
  }
  metrics: { title: string; items: { kind: string; value: string; label: string }[] }
  experience: {
    title: string
    role: string
    place: string
    labels: { problem: string; contribution: string; benefit: string }
    items: Item[]
  }
  projects: {
    title: string
    live: string
    code: string
    video: string
    play: string
    pause: string
    howItWorks: string
    liveNote: string
    doneToday: Project
    recycleApp: Project
  }
  path: { title: string; stations: { title: string; note: string }[]; since: string; story: string }
  education: { title: string; items: { name: string; year: string }[] }
  languages: { title: string; items: { name: string; level: string }[] }
  contact: { headline: string; text: string; email: string }
  footer: { built: string }
}
