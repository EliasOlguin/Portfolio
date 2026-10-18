export const links = {
  email: 'mailto:eliasolguinde@gmail.com',
  github: 'https://github.com/EliasOlguin',
  linkedin: 'https://www.linkedin.com/in/eliasolguin/',
  cv: { en: '/Elias-Olguin-CV.pdf', es: '/Elias-Olguin-CV-ES.pdf', de: '/Elias-Olguin-CV-DE.pdf' },
  doneToday: {
    live: 'https://donetoday-15xl.onrender.com',
    code: 'https://github.com/EliasOlguin/DoneToday',
  },
  recycleApp: {
    code: 'https://github.com/EliasOlguin/recycle-app',
    video: '/media/recycle-app.mp4',
  },
}

/** Language-independent profile data (stack names, years). */
export const stack = {
  frontend: 'React · TypeScript · JavaScript · Redux',
  backend: 'C# · .NET · Node · REST',
  data: 'SQL Server · PostgreSQL · MySQL',
}

export const experienceStack = [
  'React',
  'Redux',
  'TypeScript',
  'C# / .NET Core',
  'SQL Server',
  'Raspberry Pi',
]

export const projectStack = {
  doneToday: ['React 19', 'TypeScript', 'ASP.NET Core', 'PostgreSQL'],
  recycleApp: ['Expo / React Native', 'TypeScript', 'Fastify', 'PostgreSQL'],
}

/** DoneToday gallery files in public/media/donetoday/<lang>/ (see tools/media/donetoday-gallery.mjs). */
export const doneTodaySlides = [
  '01-today',
  '02-complete',
  '03-create',
  '04-habits',
  '05-stats',
  '06-settings',
  '07-signup',
]

// Flip to true once the clip and its poster exist in public/media/ (see tools/record-demos).
export const recordedClips = { doneToday: false, recycleApp: false }
