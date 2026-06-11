export const AUTHOR = {
  name: 'Héctor',
  displayName: 'Héctor, responsable técnico de WavDev',
  slug: 'hector-wavdev',
  role: 'Responsable técnico y autor',
  profileUrl: '/autores/hector-wavdev/',
  linkedin: 'https://www.linkedin.com/in/hector-wavdev/',
  specialties: [
    'Arquitectura de software empresarial',
    'Sistemas a la medida e integraciones',
    'CRM, automatización y procesos comerciales',
    'Desarrollo web técnico y medición',
  ],
} as const

export const PRICE_GUIDES = {
  'sistemas-a-la-medida': {
    label: 'Sistemas a la medida',
    ranges: [
      ['Diagnóstico y definición', 'Q2,500–Q6,000', 'Mapeo, riesgos, alcance inicial y criterios de aceptación.'],
      ['Primera versión operativa', 'Q18,000–Q45,000', 'Un proceso prioritario, roles, reportes básicos y despliegue.'],
      ['Plataforma con integraciones', 'Q45,000–Q120,000+', 'Varios módulos, migración, APIs, permisos y operación crítica.'],
    ],
    timeline: 'Una primera fase suele requerir entre 6 y 14 semanas después de validar alcance y datos.',
  },
  'crm-para-empresas': {
    label: 'CRM para empresas',
    ranges: [
      ['Diagnóstico comercial', 'Q2,000–Q5,000', 'Pipeline, fuentes, responsables, indicadores e integraciones.'],
      ['Configuración e implementación', 'Q8,000–Q25,000', 'Etapas, campos, automatizaciones, capacitación y migración básica.'],
      ['CRM personalizado o integrado', 'Q25,000–Q75,000+', 'Desarrollo propio, WhatsApp, cotizaciones, portales o sistemas internos.'],
    ],
    timeline: 'Una implementación enfocada puede tomar entre 3 y 8 semanas; integraciones complejas requieren fases adicionales.',
  },
  'erp-para-pymes-guatemala': {
    label: 'ERP para PYMES',
    ranges: [
      ['Evaluación y diseño por fases', 'Q3,500–Q8,000', 'Procesos, módulos, alternativas, datos y plan de adopción.'],
      ['Primera fase ERP', 'Q20,000–Q60,000', 'Ventas, compras, inventario o reportes con alcance controlado.'],
      ['Implementación multiárea', 'Q60,000–Q180,000+', 'Múltiples módulos, migración, integraciones, capacitación y soporte.'],
    ],
    timeline: 'La primera fase suele tomar entre 8 y 16 semanas. Un ERP completo se implementa gradualmente.',
  },
  'crm-ventas-guatemala': {
    label: 'CRM de ventas',
    ranges: [
      ['Diseño del proceso comercial', 'Q2,000–Q5,000', 'Etapas, actividades, fuentes, metas y responsabilidades.'],
      ['CRM configurado', 'Q8,000–Q22,000', 'Pipeline, migración básica, reportes y capacitación.'],
      ['CRM con automatización', 'Q22,000–Q65,000+', 'WhatsApp, formularios, cotizaciones, integraciones y reglas propias.'],
    ],
    timeline: 'Un equipo puede comenzar con una primera versión entre 3 y 7 semanas.',
  },
} as const

export type PriceGuideKey = keyof typeof PRICE_GUIDES
