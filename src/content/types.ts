type Item = { name: string; text: string }
type Project = { description: string; highlights: string[] }

export type Content = {
  nav: { skip: string; language: string }
  hero: {
    headline: string
    rows: { frontend: string; backend: string; data: string; base: string }
    base: string
    cta: { cv: string; github: string; linkedin: string; email: string }
  }
  metrics: { title: string; items: { value: string; label: string }[] }
  experience: { title: string; role: string; place: string; items: Item[] }
  projects: {
    title: string
    live: string
    code: string
    video: string
    play: string
    doneToday: Project
    recycleApp: Project
  }
  path: { title: string; stations: { title: string; note: string }[]; story: string }
  education: { title: string; items: { name: string; year: string }[] }
  languages: { title: string; items: { name: string; level: string }[] }
  contact: { headline: string; text: string; email: string }
  footer: { built: string }
}
