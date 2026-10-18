import type { Content } from './types'

export const es: Content = {
  nav: {
    skip: 'Saltar al contenido',
    language: 'Idioma',
    stack: 'Tecnologías',
    sections: 'Secciones',
    contact: 'Contacto',
  },
  hero: {
    headline:
      'Desarrollador full-stack con experiencia en la industria. React y TypeScript en el front, C#/.NET y SQL detrás.',
    story:
      'Empecé en una línea de producción, aprendí a programar de noche y terminé desarrollando software que se usa en esa misma operación.',
    rows: {
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Datos',
      base: 'Base',
      open: 'Abierto a',
    },
    base: 'Colonia, Alemania · ciudadano UE · disponible ya',
    open: 'Roles full-stack · remoto · reubicación',
    cta: { cv: 'Descargar CV', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
  },
  metrics: {
    title: 'En resumen',
    items: [
      { kind: 'Rol', value: '2022 – 2024', label: 'desarrollador de software en Newsan' },
      {
        kind: 'Alcance del sistema',
        value: '6',
        label: 'fábricas usan el sistema de trazabilidad en el que trabajé',
      },
      {
        kind: 'Progresión',
        value: '20 meses',
        label: 'de la línea de producción a desarrollador de software',
      },
    ],
  },
  experience: {
    title: 'Experiencia',
    role: 'Desarrollador de software · Newsan',
    place: 'Ushuaia, AR · abr. 2022 – ene. 2024 · entorno industrial 24/7',
    labels: {
      problem: 'Problema',
      contribution: 'Mi aporte',
      benefit: 'Beneficio operativo',
    },
    items: [
      {
        name: 'Sistema de trazabilidad de producción · módulo SPP',
        problem:
          'La aplicación de escritorio anterior, hecha en Visual Basic, tenía los modelos y las validaciones escritos en el código: cada cambio de modelo, y cada validación de modelo y número de serie, había que actualizarlos a mano.',
        contribution:
          'Dentro de un sistema de trazabilidad usado en 6 fábricas, fui responsable de SPP, el módulo central para configurar y validar la producción: esquema de base de datos, lógica de negocio y reglas configurables con regex que verifican los códigos de componentes según un formato combinado (campos como modelo, año, número de serie y planta). También participé en la implantación en planta en Buenos Aires.',
        benefit:
          'Los cambios de modelo y las reglas de validación pasaron a ser configuración en lugar de cambios de código, y el proceso se volvió dinámico. Los errores de ensamblaje se detectan antes de que la unidad avance en la línea. Lo usan a diario supervisores, ingeniería y gerencia de producción.',
      },
      {
        name: 'Control de seguridad ESD',
        problem:
          'Los controles de seguridad ESD en puestos críticos se registraban con papel y lápiz.',
        contribution:
          'Desarrollé la aplicación de punta a punta: lógica de negocio, base de datos, gestión de personal y flujos de validación, integrada con un banco de pruebas con Raspberry Pi que informa resultados Good / No Good.',
        benefit:
          'Un registro digital riguroso reemplazó al papel: la aplicación detecta automáticamente, en cada turno, quién hizo el control ESD y quién no, actualiza el personal en cada cambio de turno y da a los supervisores un informe diario de cumplimiento.',
      },
    ],
  },
  projects: {
    title: 'Proyectos',
    live: 'En vivo',
    code: 'Código',
    video: 'Video demo',
    play: 'Reproducir',
    pause: 'Pausar',
    howItWorks: 'Cómo funciona',
    liveNote: 'Hosting gratuito: la primera carga puede tardar hasta un minuto.',
    doneToday: {
      description:
        'Un tracker de hábitos: programas tus hábitos, los marcas cada día y sigues tus rachas. En español, inglés y alemán.',
      meta: 'Desde oct. 2026 · v1.2.2 · en vivo',
      steps: [
        'Hoy muestra los hábitos programados para el día; un toque los marca como hechos.',
        'Cada hábito guarda su racha actual y la mejor.',
        'Las estadísticas muestran totales semanales, un gráfico diario de cumplimiento y el detalle por hábito.',
      ],
      highlights: [
        'Zona horaria por usuario: los horarios y las rachas siguen el día de cada persona.',
        'Seguridad de cuenta: 2FA, protección CSRF y confirmación de email.',
        'Lógica de rachas y planificación testeada (xUnit) y versiones publicadas.',
      ],
      shot: 'Pantalla Hoy de DoneToday: tres hábitos para marcar con su racha actual y la mejor, más el cumplimiento de la semana y el gráfico diario',
    },
    recycleApp: {
      description:
        'Para quienes no conocen las reglas de separación de Alemania: sacas una foto del objeto antes de tirarlo y te dice en qué contenedor va según tu ciudad.',
      meta: 'Desde oct. 2026 · en desarrollo',
      steps: [
        'Sacas una foto del objeto.',
        'El modelo de visión solo identifica qué es, dentro de una lista cerrada de categorías.',
        'Las reglas de tu ciudad deciden el contenedor; si el objeto tiene varios materiales, responde por cada parte.',
      ],
      highlights: [
        'La API key queda en el backend, y las fotos se analizan sin guardarse.',
        'Reglas en borrador para Köln, Düsseldorf y Berlín, cada una marcada según cómo se verificó con fuentes oficiales.',
        'Feedback anónimo para corregir respuestas erróneas.',
      ],
      shot: 'Dos pantallas de recycle-app: una caja de galletitas separada entre el contenedor azul de papel y el amarillo de envases, y una pregunta sobre el color de un frasco de vidrio',
    },
  },
  path: {
    title: 'Trayectoria',
    stations: [
      { title: 'Soldador', note: '2020 · Ushuaia' },
      { title: 'Técnico de reparación', note: '2021 · a cargo de un junior' },
      { title: 'Desarrollador de software', note: '2022 · Newsan' },
      { title: 'Colonia', note: '2024 – hoy · ciudadano UE' },
    ],
    since: 'Desde 2024',
    story:
      'Me mudé a Alemania y completé el trámite de mi ciudadanía italiana (UE), que incluyó cinco meses en Italia. En paralelo estuve desarrollando proyectos personales, como los dos de arriba, y mejorando mi inglés.',
  },
  education: {
    title: 'Formación',
    items: [
      { name: 'Diplomatura Back End · C# y .NET', year: '2021' },
      { name: 'Programa Full Stack · UTN', year: '2022' },
      { name: 'Diplomatura Frontend · Angular y JavaScript', year: '2022' },
    ],
  },
  languages: {
    title: 'Idiomas',
    items: [
      { name: 'Español', level: 'nativo' },
      { name: 'Inglés', level: 'B2 · profesional' },
      { name: 'Alemán', level: 'A1 · aprendiendo' },
    ],
  },
  contact: {
    headline: 'Construyamos algo.',
    text: 'Actualmente en Colonia, Alemania. Abierto a oportunidades full-stack, trabajo remoto y reubicación.',
    email: 'Escríbeme',
  },
  footer: { built: 'hecho con React, TypeScript y mate' },
}
