import type { Content } from './types'

export const es: Content = {
  nav: { skip: 'Saltar al contenido', language: 'Idioma', stack: 'Tecnologías' },
  hero: {
    headline:
      'Desarrollador full-stack. React y TypeScript en el front, C#/.NET y SQL detrás, en producción.',
    rows: { frontend: 'Frontend', backend: 'Backend', data: 'Datos', base: 'Base' },
    base: 'Colonia, DE · ciudadano UE · disponible ya',
    cta: { cv: 'Descargar CV', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
  },
  metrics: {
    title: 'En resumen',
    items: [
      { value: '2 años', label: 'full-stack profesional' },
      { value: '6', label: 'fábricas usan mi sistema' },
      { value: '24/7', label: 'entorno de producción' },
      { value: '2×', label: 'ascendido por mérito' },
    ],
  },
  experience: {
    title: 'Experiencia',
    role: 'Desarrollador de software · Newsan',
    place: 'Ushuaia, AR · 2022 – 2024',
    items: [
      {
        name: 'Sistema de trazabilidad de producción (SPP)',
        text: 'Responsable del módulo central que configura y valida la producción en 6 fábricas. Diseñé el esquema de base de datos y las reglas de validación con regex que detectan errores de ensamblado antes de que la unidad avance en la línea. Ayudé a reemplazar un sistema de escritorio lento y lo implementé en planta en Buenos Aires.',
      },
      {
        name: 'Control de seguridad ESD',
        text: 'Desarrollé de punta a punta una app que controla la seguridad antiestática en puestos críticos: bancos de prueba con Raspberry Pi, lógica por turno que muestra quién falta validar y reportes diarios de cumplimiento para supervisores.',
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
    doneToday: {
      description:
        'Un tracker de hábitos con rachas, estadísticas, 2FA e inicio de sesión con Google, en 3 idiomas.',
      highlights: [
        'Zona horaria por usuario: los horarios y las rachas siguen el día de cada persona.',
        'Seguridad de cuenta: 2FA, protección CSRF y confirmación de email.',
        'Lógica de rachas y planificación testeada (xUnit) y versiones publicadas.',
      ],
    },
    recycleApp: {
      description:
        'Saca una foto de un objeto y descubre en qué contenedor va, según las reglas de tu ciudad alemana.',
      highlights: [
        'La llamada al modelo de visión corre en el backend: la API key nunca viaja en la app.',
        'Reglas de separación por ciudad sobre la respuesta del modelo.',
        'Feedback anónimo para corregir respuestas erróneas.',
      ],
    },
  },
  path: {
    title: 'Trayectoria',
    stations: [
      { title: 'Soldador', note: '2020 · Ushuaia' },
      { title: 'Técnico de reparación', note: '2021 · a cargo de un junior' },
      { title: 'Desarrollador de software', note: '2022 · Newsan' },
      { title: 'Colonia', note: '2024 · ciudadano UE' },
    ],
    story:
      'Empecé en la línea de producción, aprendí a programar de noche y terminé construyendo el software con el que trabajaba mi antigua línea.',
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
    text: 'Abierto a roles full-stack en Colonia / NRW o remoto.',
    email: 'Escríbeme',
  },
  footer: { built: 'hecho con React, TypeScript y mate' },
}
