const GOOGLE_TRENDS_RSS = 'https://trends.google.com/trending/rss?geo=GT'
const HACKER_NEWS_API = 'https://hacker-news.firebaseio.com/v0'
const CACHE_TTL = 6 * 60 * 60 * 1000

type TrendCategory = 'Inteligencia artificial' | 'Comercio digital' | 'Software empresarial' | 'Ciberseguridad' | 'Tecnología'

export interface TechnologyTrend {
  title: string
  traffic: string
  publishedAt: string
  category: TrendCategory
  context: string
  source: 'Google Trends' | 'Hacker News API' | 'Radar editorial WavDev'
  sourceUrl: string
  relatedUrl: string
}

interface CachedTrends {
  expiresAt: number
  trends: TechnologyTrend[]
  fetchedAt: string
}

const keywordGroups: Array<{
  category: TrendCategory
  terms: string[]
  context: string
  relatedUrl: string
}> = [
  {
    category: 'Inteligencia artificial',
    terms: ['ia', 'ai', 'inteligencia artificial', 'chatgpt', 'gemini', 'openai', 'copilot', 'claude'],
    context: 'La adopción de IA abre oportunidades para clasificar información, asistir equipos y automatizar tareas, siempre con revisión humana y controles sobre los datos.',
    relatedUrl: '/servicios/automatizacion-de-procesos/',
  },
  {
    category: 'Comercio digital',
    terms: ['ecommerce', 'e-commerce', 'tienda en linea', 'shopify', 'woocommerce', 'pago', 'pagos', 'whatsapp'],
    context: 'El interés en canales digitales suele convertirse en proyectos de catálogo, pagos, seguimiento comercial e integración entre pedidos e inventario.',
    relatedUrl: '/servicios/desarrollo-ecommerce-guatemala/',
  },
  {
    category: 'Software empresarial',
    terms: ['crm', 'erp', 'pos', 'inventario', 'software', 'sistema', 'excel', 'factura', 'fel'],
    context: 'Estas búsquedas reflejan necesidades de control, trazabilidad e integración que conviene evaluar desde el proceso empresarial, no solo desde la herramienta.',
    relatedUrl: '/soluciones/',
  },
  {
    category: 'Ciberseguridad',
    terms: ['ciberseguridad', 'seguridad', 'hack', 'ransomware', 'phishing', 'brecha de datos', 'contraseña'],
    context: 'Una tendencia de seguridad es una oportunidad para revisar accesos, respaldos, permisos, dependencias y procedimientos de recuperación.',
    relatedUrl: '/servicios/sistemas-a-la-medida/',
  },
  {
    category: 'Tecnología',
    terms: ['tecnologia', 'app', 'aplicacion', 'android', 'iphone', 'apple', 'google', 'microsoft', 'nube', 'cloud', 'api'],
    context: 'Los cambios de plataformas y dispositivos pueden afectar integraciones, experiencia móvil y decisiones de arquitectura en proyectos empresariales.',
    relatedUrl: '/servicios/desarrollo-de-apps-moviles/',
  },
]

const fallbackTrends: TechnologyTrend[] = [
  {
    title: 'Inteligencia artificial aplicada a procesos empresariales',
    traffic: 'Tema en seguimiento',
    publishedAt: '',
    category: 'Inteligencia artificial',
    context: keywordGroups[0].context,
    source: 'Radar editorial WavDev',
    sourceUrl: '/recursos/',
    relatedUrl: keywordGroups[0].relatedUrl,
  },
  {
    title: 'Integración entre tiendas en línea e inventario',
    traffic: 'Tema en seguimiento',
    publishedAt: '',
    category: 'Comercio digital',
    context: keywordGroups[1].context,
    source: 'Radar editorial WavDev',
    sourceUrl: '/recursos/como-conectar-tienda-inventario/',
    relatedUrl: keywordGroups[1].relatedUrl,
  },
  {
    title: 'CRM y automatización del seguimiento de ventas',
    traffic: 'Tema en seguimiento',
    publishedAt: '',
    category: 'Software empresarial',
    context: keywordGroups[2].context,
    source: 'Radar editorial WavDev',
    sourceUrl: '/recursos/como-elegir-crm-empresa-guatemala/',
    relatedUrl: '/soluciones/crm-ventas-guatemala/',
  },
  {
    title: 'Seguridad, respaldos y continuidad operativa',
    traffic: 'Tema en seguimiento',
    publishedAt: '',
    category: 'Ciberseguridad',
    context: keywordGroups[3].context,
    source: 'Radar editorial WavDev',
    sourceUrl: '/recursos/',
    relatedUrl: keywordGroups[3].relatedUrl,
  },
]

let cache: CachedTrends | undefined

function decodeXml(value: string) {
  return value
    .replaceAll('<![CDATA[', '')
    .replaceAll(']]>', '')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .trim()
}

function readTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match ? decodeXml(match[1]) : ''
}

function matchesTerm(title: string, term: string) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, 'iu').test(title)
}

function classifyTrend(title: string) {
  const normalized = title.toLocaleLowerCase('es')
  return keywordGroups.find((group) => group.terms.some((term) => matchesTerm(normalized, term)))
}

function parseGoogleTrends(xml: string): TechnologyTrend[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || []
  const seen = new Set<string>()

  return items.flatMap((item) => {
    const title = readTag(item, 'title')
    const group = classifyTrend(title)
    const key = title.toLocaleLowerCase('es')
    if (!title || !group || seen.has(key)) return []

    seen.add(key)
    const published = readTag(item, 'pubDate')
    const parsedDate = published ? new Date(published) : undefined

    return [{
      title,
      traffic: readTag(item, 'ht:approx_traffic') || 'En aumento',
      publishedAt: parsedDate && !Number.isNaN(parsedDate.valueOf()) ? parsedDate.toISOString() : '',
      category: group.category,
      context: group.context,
      source: 'Google Trends' as const,
      sourceUrl: `https://trends.google.com/trends/explore?geo=GT&q=${encodeURIComponent(title)}`,
      relatedUrl: group.relatedUrl,
    }]
  }).slice(0, 8)
}

interface HackerNewsStory {
  id: number
  title?: string
  url?: string
  score?: number
  time?: number
  type?: string
  deleted?: boolean
  dead?: boolean
}

async function fetchHackerNewsTrends(): Promise<TechnologyTrend[]> {
  const idsResponse = await fetch(`${HACKER_NEWS_API}/topstories.json`, {
    signal: AbortSignal.timeout(5000),
  })
  if (!idsResponse.ok) return []

  const ids = (await idsResponse.json() as number[]).slice(0, 16)
  const stories = await Promise.all(ids.map(async (id) => {
    try {
      const response = await fetch(`${HACKER_NEWS_API}/item/${id}.json`, {
        signal: AbortSignal.timeout(4000),
      })
      return response.ok ? await response.json() as HackerNewsStory : undefined
    } catch {
      return undefined
    }
  }))

  return stories.flatMap((story) => {
    if (!story?.title || story.type !== 'story' || story.deleted || story.dead) return []
    const group = classifyTrend(story.title) || keywordGroups.at(-1)!
    return [{
      title: decodeXml(story.title),
      traffic: `${story.score || 0} puntos de interés`,
      publishedAt: story.time ? new Date(story.time * 1000).toISOString() : '',
      category: group.category,
      context: group.context,
      source: 'Hacker News API' as const,
      sourceUrl: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      relatedUrl: group.relatedUrl,
    }]
  }).slice(0, 4)
}

function combineWithFallback(liveTrends: TechnologyTrend[], globalTrends: TechnologyTrend[]) {
  const combined = [...liveTrends, ...globalTrends]
  const categories = new Set(combined.map((trend) => trend.category))
  const additions = fallbackTrends.filter((trend) => !categories.has(trend.category))
  return [...combined, ...additions].slice(0, 8)
}

export async function getTechnologyTrends() {
  const now = Date.now()
  if (cache && cache.expiresAt > now) return cache

  let liveTrends: TechnologyTrend[] = []
  let globalTrends: TechnologyTrend[] = []
  try {
    const response = await fetch(GOOGLE_TRENDS_RSS, {
      headers: { 'User-Agent': 'WavDev Technology Trends Reader/1.0' },
      signal: AbortSignal.timeout(5000),
    })
    if (response.ok) liveTrends = parseGoogleTrends(await response.text())
  } catch {
    // The editorial fallback keeps the page useful when the external feed is unavailable.
  }

  try {
    globalTrends = await fetchHackerNewsTrends()
  } catch {
    // Google Trends and the editorial fallback can still render independently.
  }

  cache = {
    expiresAt: now + CACHE_TTL,
    fetchedAt: new Date(now).toISOString(),
    trends: combineWithFallback(liveTrends, globalTrends),
  }
  return cache
}
