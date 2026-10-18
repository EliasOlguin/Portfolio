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
          'La aplicación de escritorio anterior, en Visual Basic, tenía modelos y validaciones escritos en el código: cada cambio de modelo implicaba editar código a mano.',
        contribution:
          'En un sistema de trazabilidad usado en 6 fábricas, fui responsable de SPP, su módulo central de configuración y validación (esquema, lógica de negocio, validaciones con regex). Participé en la implantación en Buenos Aires.',
        benefit:
          'Los cambios de modelo y las validaciones pasaron de cambios de código a configuración. Los errores de ensamblaje se detectan antes de que la unidad avance; lo usan a diario supervisores, ingeniería y gerencia.',
      },
      {
        name: 'Control de seguridad ESD',
        problem:
          'Los controles de seguridad ESD en puestos críticos se registraban con papel y lápiz.',
        contribution:
          'La desarrollé de punta a punta: lógica de negocio, base de datos, gestión de personal e integración con un banco de pruebas con Raspberry Pi (resultados Good / No Good).',
        benefit:
          'Un registro digital por turno reemplazó al papel: muestra automáticamente quién hizo el control y quién no, actualiza el personal en cada cambio de turno y envía un informe diario a supervisión.',
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
    zoom: 'Ampliar captura',
    close: 'Cerrar',
    screenshots: 'Capturas',
    prev: 'Anterior',
    next: 'Siguiente',
    liveNote: 'Hosting gratuito: la primera carga puede tardar hasta un minuto.',
    doneToday: {
      description:
        'Una app de seguimiento de hábitos: programas tus hábitos, los marcas cada día y sigues tus rachas. En español, inglés y alemán.',
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
      gallery: [
        '1. Acceso a DoneToday. Ingresá con tu email y contraseña. Desde esta pantalla también podés recuperar el acceso o crear una cuenta.',
        '2. Creación de cuenta. Completá tu email y una contraseña segura. El registro incluye confirmación por correo antes de iniciar sesión.',
        '3. Tu rutina de hoy. La pantalla Hoy reúne los hábitos programados, las rachas y un resumen del progreso semanal.',
        '4. Nuevo hábito. Elegí un nombre y los días de la semana. Podés agregar una meta diaria, una descripción, un icono y un color. Guardar incorpora el hábito a tu rutina.',
        '5. Registro diario. Marcá el círculo al terminar un hábito. El contador de Hoy se actualiza y el aviso permite deshacer la acción.',
        '6. Gestión de hábitos. Consultá tus rutinas y su programación. Desde esta lista podés abrir cada hábito o cambiar el orden en que aparecen.',
        '7. Progreso semanal. Revisá las finalizaciones por día y el desglose por hábito. El selector permite consultar todos los hábitos o uno en particular.',
        '8. Calendario mensual. Consultá el cumplimiento de cada fecha y navegá entre meses. El verde identifica los días con todos los hábitos programados completados.',
        '9. Preferencias de la cuenta. Configurá tu zona horaria, nombre, apariencia e idioma. También encontrás opciones de seguridad y los hábitos archivados.',
      ],
      shot: 'Pantalla Hoy de DoneToday: tres hábitos para marcar con su racha actual y la mejor, más el cumplimiento de la semana y el gráfico diario',
    },
    recycleApp: {
      description:
        'Para quienes no conocen las reglas de separación de Alemania: sacas una foto del objeto antes de tirarlo y te dice en qué contenedor va según tu ciudad.',
      meta: 'Desde oct. 2026 · en desarrollo',
      steps: [
        'Sacas una foto del objeto.',
        'Ves el contenedor correcto para tu ciudad; si el objeto tiene varios materiales, la respuesta es por parte.',
        'Puedes reportar una respuesta errónea de forma anónima para que se corrijan las reglas.',
      ],
      highlights: [
        'El modelo de visión solo identifica el objeto; las reglas de tu ciudad en la base de datos deciden el contenedor.',
        'La API key queda en el backend, y las fotos se analizan sin guardarse.',
        'Reglas en borrador para Köln, Düsseldorf y Berlín, cada una marcada según cómo se verificó con fuentes oficiales.',
      ],
      shot: 'Dos pantallas de recycle-app: una caja de galletitas separada entre el contenedor azul de papel y el amarillo de envases, y una pregunta sobre el color de un frasco de vidrio',
    },
  },
  path: {
    title: 'Trayectoria',
    stations: [
      { title: 'Soldador de brazing', place: 'Newsan · Ushuaia', dates: '2020 – 2021' },
      { title: 'Técnico de reparación', place: 'Newsan · Ushuaia', dates: '2021 – 2022' },
      { title: 'Desarrollador de software', place: 'Newsan · Ushuaia', dates: '2022 – 2024' },
      { title: 'Mudanza a Alemania', place: 'Italia · Colonia', dates: '2024 – hoy' },
    ],
    since: 'Desde 2024',
    story:
      'Me mudé a Alemania y completé el trámite de reconocimiento de mi ciudadanía italiana (UE), que incluyó cinco meses en Italia. Mientras tanto estuve desarrollando proyectos personales, incluidos DoneToday y recycle-app, y mejorando mi inglés.',
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
