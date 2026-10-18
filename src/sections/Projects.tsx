import { Chips } from '../components/Chips'
import { LoopVideo } from '../components/LoopVideo'
import { Section } from '../components/Section'
import { ShotZoom, type Slide } from '../components/ShotZoom'
import { useLang } from '../LangProvider'
import { doneTodaySlides, links, projectStack, recordedClips } from '../links'

type CardProps = {
  name: string
  media: string | null
  shot: string
  slides: Slide[]
  copy: { description: string; meta: string; steps: string[]; highlights: string[]; shot: string }
  howItWorks: string
  note?: string
  stack: readonly string[]
  actions: { label: string; href: string; external: boolean }[]
}

function ProjectCard({
  name,
  media,
  shot,
  slides,
  copy,
  stack,
  actions,
  howItWorks,
  note,
}: CardProps) {
  return (
    <article className="project sheen">
      {media ? (
        <LoopVideo src={`/media/${media}.mp4`} poster={`/media/${media}.jpg`} label={name} />
      ) : (
        <ShotZoom name={name} src={`/media/${shot}.webp`} alt={copy.shot} slides={slides} />
      )}
      <div className="project__body">
        <h3>{name}</h3>
        <p className="project__meta mono">{copy.meta}</p>
        <p className="project__desc">{copy.description}</p>
        <ul className="project__points">
          {copy.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <details className="project__more">
          <summary className="mono">{howItWorks}</summary>
          <ol className="project__steps">
            {copy.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </details>
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
        {note && <p className="project__note">{note}</p>}
      </div>
    </article>
  )
}

export function Projects({ clips = recordedClips }: { clips?: typeof recordedClips }) {
  const { lang, t } = useLang()
  const p = t.projects
  return (
    <Section id="projects" label={`02 / ${p.title}`}>
      <div className="projects">
        <ProjectCard
          name="DoneToday"
          shot={`donetoday-${lang}`}
          slides={doneTodaySlides.map((file, i) => ({
            src: `/media/donetoday/${lang}/${file}.webp`,
            caption: p.doneToday.gallery[i],
          }))}
          media={clips.doneToday ? 'donetoday' : null}
          copy={p.doneToday}
          howItWorks={p.howItWorks}
          note={p.liveNote}
          stack={projectStack.doneToday}
          actions={[
            { label: p.live, href: links.doneToday.live, external: true },
            { label: p.code, href: links.doneToday.code, external: true },
          ]}
        />
        <ProjectCard
          name="recycle-app"
          shot="recycle-app"
          // Only one capture exists so far: both screens side by side, uncropped.
          slides={[{ src: '/media/recycle-app.webp', caption: p.recycleApp.shot }]}
          media={clips.recycleApp ? 'recycle-app' : null}
          copy={p.recycleApp}
          howItWorks={p.howItWorks}
          stack={projectStack.recycleApp}
          actions={[
            { label: p.code, href: links.recycleApp.code, external: true },
            ...(clips.recycleApp
              ? [{ label: p.video, href: links.recycleApp.video, external: false }]
              : []),
          ]}
        />
      </div>
    </Section>
  )
}
