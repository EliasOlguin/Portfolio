import { Chips } from '../components/Chips'
import { LoopVideo } from '../components/LoopVideo'
import { Section } from '../components/Section'
import { useLang } from '../LangProvider'
import { links, projectStack } from '../links'

type CardProps = {
  name: string
  media: string
  copy: { description: string; highlights: string[] }
  stack: readonly string[]
  actions: { label: string; href: string; external: boolean }[]
}

function ProjectCard({ name, media, copy, stack, actions }: CardProps) {
  return (
    <article className="project sheen">
      <LoopVideo src={`/media/${media}.mp4`} poster={`/media/${media}.jpg`} label={name} />
      <div className="project__body">
        <h3>{name}</h3>
        <p className="project__desc">{copy.description}</p>
        <ul className="project__points">
          {copy.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <Chips items={stack} />
        <p className="project__links mono">
          {actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              {...(a.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {a.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </p>
      </div>
    </article>
  )
}

export function Projects() {
  const { t } = useLang()
  const p = t.projects
  return (
    <Section id="projects" label={`02 / ${p.title}`}>
      <div className="projects">
        <ProjectCard
          name="DoneToday"
          media="donetoday"
          copy={p.doneToday}
          stack={projectStack.doneToday}
          actions={[
            { label: p.live, href: links.doneToday.live, external: true },
            { label: p.code, href: links.doneToday.code, external: true },
          ]}
        />
        <ProjectCard
          name="recycle-app"
          media="recycle-app"
          copy={p.recycleApp}
          stack={projectStack.recycleApp}
          actions={[
            { label: p.code, href: links.recycleApp.code, external: true },
            { label: p.video, href: links.recycleApp.video, external: false },
          ]}
        />
      </div>
    </Section>
  )
}
