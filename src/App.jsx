/**
 * WavDev — Scrollytelling SPA
 * Experiencia inmersiva con scroll-driven storytelling
 */

import { useState, useEffect, useRef } from 'react'
import {
  motion, AnimatePresence,
  useScroll, useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Link as ScrollLink } from 'react-scroll'
import { useInView as useIO } from 'react-intersection-observer'

import { FiMenu, FiX, FiMail, FiPhone, FiMapPin, FiSend, FiChevronDown, FiArrowRight } from 'react-icons/fi'
import {
  SiReact, SiLaravel, SiFlutter, SiNextdotjs,
  SiVuedotjs, SiWordpress, SiFirebase,
} from 'react-icons/si'
import {
  FaLinkedin, FaWhatsapp, FaGlobe, FaMobile, FaCogs, FaUsers, FaCheck,
} from 'react-icons/fa'

// ═══════════════════════════════════════════════════════════════
//  CONSTANTES
// ═══════════════════════════════════════════════════════════════
const WA_URL = 'https://wa.me/50238536836'
const LI_URL = 'https://www.linkedin.com/in/hector-wavdev/'

// ═══════════════════════════════════════════════════════════════
//  DATOS
// ═══════════════════════════════════════════════════════════════
const PROJECTS = [
  {
    id: 1, name: 'LUXORA',
    category: 'E-commerce de Lujo',  tech: 'React + Next.js',
    color: '#C4A97D', image: '/images/proj-luxora.webp',     TechIcon: SiReact,
  },
  {
    id: 2, name: 'GrowSales',
    category: 'CRM de Ventas',       tech: 'Vue.js + Laravel',
    color: '#1BBCD8', image: '/images/proj-growsales.webp',  TechIcon: SiVuedotjs,
  },
  {
    id: 3, name: 'Casa Alta',
    category: 'Portal Inmobiliario', tech: 'React + Node.js',
    color: '#D4A76A', image: '/images/proj-casaalta.webp',   TechIcon: SiReact,
  },
  {
    id: 4, name: 'Talento 360',
    category: 'Plataforma RRHH',     tech: 'React + Firebase',
    color: '#34D399', image: '/images/proj-talento360.webp', TechIcon: SiFirebase,
  },
  {
    id: 5, name: 'Nexora',
    category: 'Software Empresarial',tech: 'Next.js + AWS',
    color: '#818CF8', image: '/images/proj-nexora.webp',     TechIcon: SiNextdotjs,
  },
  {
    id: 6, name: 'Mar de Luz',
    category: 'Resort & Wellness',   tech: 'WordPress Premium',
    color: '#FDBA74', image: '/images/proj-mardeluz.webp',   TechIcon: SiWordpress,
  },
]

const SERVICES = [
  {
    id: 1, num: '01', emoji: '🌐', Icon: FaGlobe,
    title: 'Desarrollo Web',
    tagline: 'Presencia digital profesional para tu negocio',
    detail: 'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para SEO que convierten visitantes en clientes reales.',
    bullets: ['Diseño responsivo', 'Optimización SEO', 'Rendimiento máximo', 'Panel de gestión'],
    image: '/images/svc-web.webp',
  },
  {
    id: 2, num: '02', emoji: '📱', Icon: FaMobile,
    title: 'Apps Móviles',
    tagline: 'Android e iOS con Flutter y React Native',
    detail: 'Desarrollamos apps móviles intuitivas y de alto rendimiento para Android e iOS con una sola base de código.',
    bullets: ['Android e iOS', 'UI/UX nativo', 'Notificaciones push', 'Integración de APIs'],
    image: '/images/svc-apps.webp',
  },
  {
    id: 3, num: '03', emoji: '⚙️', Icon: FaCogs,
    title: 'Sistemas a la Medida',
    tagline: 'Software que se adapta exactamente a tus procesos',
    detail: 'Creamos sistemas empresariales personalizados que automatizan procesos y aumentan la productividad de tu empresa.',
    bullets: ['Automatización', 'Dashboards', 'Reportes avanzados', 'Integraciones ERP'],
    image: '/images/svc-sistemas.webp',
  },
  {
    id: 4, num: '04', emoji: '🤝', Icon: FaUsers,
    title: 'Outsourcing de TI',
    tagline: 'Tu equipo de tecnología externo de confianza',
    detail: 'Proveemos talento tecnológico especializado para complementar tu equipo y acelerar el desarrollo de tus proyectos.',
    bullets: ['Desarrolladores senior', 'Gestión ágil', 'Code review', 'Soporte continuo'],
    image: '/images/svc-outsourcing.webp',
  },
]

// Tema visual por servicio
const SVC_THEMES = [
  { accent: '#C9A87C', bg: '#100D08', bgAlt: '#1A1208', label: 'Páginas Web' },
  { accent: '#5B9CF6', bg: '#05091A', bgAlt: '#080F26', label: 'Apps Móviles' },
  { accent: '#1BBCD8', bg: '#040C10', bgAlt: '#061A25', label: 'Sistemas' },
  { accent: '#7CB9E8', bg: '#04080F', bgAlt: '#060C1C', label: 'Outsourcing TI' },
]

const PLANS = [
  {
    id: 1, name: 'Básico', price: '$19', period: '/mes',
    desc: 'Perfecto para empezar', featured: false, color: '#1BBCD8',
    features: ['3 correos corporativos', '1 página web principal', 'Subdominio gratuito', 'SSL certificado', 'Hosting 5 GB'],
    extra: '+ Dominio propio $12/año',
  },
  {
    id: 2, name: 'Profesional', price: '$49', period: '/mes',
    desc: 'Para empresas en crecimiento', featured: true, badge: 'Más Popular', color: '#0DEAFF',
    features: ['10 correos corporativos', 'Hasta 3 páginas web', 'Dominio gratuito incluido', 'SSL certificado premium', 'Hosting 25 GB', 'Analytics e integración redes sociales'],
  },
  {
    id: 3, name: 'Premium', price: '$99', period: '/mes',
    desc: 'Solución empresarial completa', featured: false, color: '#29D4F0',
    features: ['50 correos corporativos', 'Hasta 10 páginas web', 'Dominio premium incluido', 'E-commerce + Chat + CDN', 'Hosting 100 GB', 'Soporte 24/7 + SEO avanzado'],
  },
]

const STATS = [
  { n: 50, s: '+', label: 'Proyectos entregados' },
  { n: 3,  s: ' años', label: 'de experiencia' },
  { n: 100, s: '%', label: 'Clientes satisfechos' },
  { n: 3,  s: '', label: 'Ciudades en Guatemala' },
]

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: (i * 47 + 11) % 100,
  y: (i * 53 + 19) % 100,
  size: (i % 3) + 1.5,
  dur: 14 + (i % 8),
  delay: (i * 0.5) % 7,
}))

// ═══════════════════════════════════════════════════════════════
//  UTILITY: WAVE ICON
// ═══════════════════════════════════════════════════════════════
function WaveIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 12 Q6 5 9 12 Q12 19 15 12 Q18 5 21 12"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY: SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════════════════════
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX: scrollYProgress, background: 'linear-gradient(90deg,#1BBCD8,#0DEAFF,#7EEAFF)' }}
    />
  )
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY: SECTION DOTS (navegación lateral)
// ═══════════════════════════════════════════════════════════════
const DOT_SECTIONS = [
  { id: 'inicio',     label: 'Inicio'     },
  { id: 'servicios',  label: 'Servicios'  },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'historia',   label: 'Historia'   },
  { id: 'precios',    label: 'Precios'    },
  { id: 'contacto',   label: 'Contacto'   },
]

function SectionDots({ active }) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3.5">
      {DOT_SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        return (
          <ScrollLink key={id} to={id} smooth duration={900} title={label}>
            <motion.div
              className="relative flex items-center justify-end gap-2 cursor-pointer group"
              animate={{ opacity: isActive ? 1 : 0.35 }}
            >
              <motion.span
                className="text-[10px] uppercase tracking-widest text-white origin-right hidden group-hover:inline-block"
                initial={{ opacity: 0, x: 8 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                {label}
              </motion.span>
              <motion.div
                className="rounded-full"
                animate={{
                  width: isActive ? 24 : 6,
                  height: 6,
                  backgroundColor: isActive ? '#1BBCD8' : 'rgba(255,255,255,0.4)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </ScrollLink>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY: REVEAL WORDS (texto que emerge del suelo)
// ═══════════════════════════════════════════════════════════════
function RevealWords({ text, className = '', delay = 0 }) {
  const [ref, inView] = useIO({ triggerOnce: true, threshold: 0.15 })
  return (
    <div ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: '0.28em' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              delay: delay + i * 0.06,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY: BLUR IN
// ═══════════════════════════════════════════════════════════════
function BlurIn({ children, className = '', delay = 0, style }) {
  const [ref, inView] = useIO({ triggerOnce: true, threshold: 0.2 })
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
      transition={{ delay, duration: 0.9, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY: ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════
function AnimCounter({ target, suffix = '' }) {
  const [ref, inView] = useIO({ triggerOnce: true, threshold: 0.6 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let v = 0
    const step = target / 80
    const id = setInterval(() => {
      v += step
      if (v >= target) { setN(target); clearInterval(id) }
      else setN(Math.floor(v))
    }, 16)
    return () => clearInterval(id)
  }, [inView, target])
  return <span ref={ref}>{n}{suffix}</span>
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY: PARTICLES
// ═══════════════════════════════════════════════════════════════
function ParticlesBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/15"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -24, 0], opacity: [0.1, 0.45, 0.1], scale: [1, 1.7, 1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(79,142,247,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,0.6) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  SEO META
// ═══════════════════════════════════════════════════════════════
function SEOMeta() {
  const SITE_URL = 'https://wavdev.lat'
  const OG_IMAGE = `${SITE_URL}/images/wavdev.png`

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: 'WavDev',
    alternateName: 'WavDev',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: OG_IMAGE,
    description: 'Agencia de desarrollo web profesional, apps móviles Android e iOS, sistemas a la medida y outsourcing de TI en Guatemala.',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GT',
      addressLocality: 'Guatemala City',
      addressRegion: 'Guatemala',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '14.6349',
      longitude: '-90.5069',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+502-3853-6836',
      email: 'contactowavdev@gmail.com',
      contactType: 'sales',
      availableLanguage: 'Spanish',
    },
    sameAs: [LI_URL, WA_URL],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Desarrollo de Software',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo Web Profesional', description: 'Sitios web modernos, responsivos y optimizados para buscadores.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aplicaciones Móviles Android e iOS', description: 'Apps nativas y multiplataforma con Flutter y React Native.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sistemas a la Medida', description: 'Software empresarial personalizado para optimizar procesos.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outsourcing de TI', description: 'Equipo de desarrolladores especializados bajo demanda.' } },
      ],
    },
  }

  const schemaWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'WavDev',
    description: 'Agencia de desarrollo web y apps móviles en Guatemala',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'es-GT',
  }

  const KEYWORDS = [
    'desarrollo web Guatemala',
    'diseño web Guatemala',
    'agencia de desarrollo web Guatemala',
    'crear página web Guatemala',
    'páginas web profesionales Guatemala',
    'desarrollo de aplicaciones móviles Guatemala',
    'apps Android iOS Guatemala',
    'Flutter developer Guatemala',
    'React Native Guatemala',
    'sistemas a la medida Guatemala',
    'software empresarial Guatemala',
    'outsourcing TI Guatemala',
    'programadores Guatemala',
    'empresa de tecnología Guatemala',
    'agencia digital Guatemala',
    'tienda online Guatemala',
    'e-commerce Guatemala',
    'desarrollo web Ciudad de Guatemala',
    'diseño UX UI Guatemala',
    'desarrollo web profesional',
    'WavDev',
  ].join(', ')

  return (
    <Helmet>
      <title>WavDev | Desarrollo Web y Apps Móviles en Guatemala</title>
      <meta name="description" content="Agencia de desarrollo web profesional en Guatemala. Creamos páginas web, apps móviles Android e iOS, sistemas a la medida y outsourcing TI. ¡Cotiza gratis!" />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="author" content="WavDev" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="theme-color" content="#1BBCD8" />

      {/* Geo tags para posicionamiento local en Guatemala */}
      <meta name="geo.region" content="GT" />
      <meta name="geo.placename" content="Guatemala City, Guatemala" />
      <meta name="geo.position" content="14.6349;-90.5069" />
      <meta name="ICBM" content="14.6349, -90.5069" />
      <meta name="language" content="es" />

      {/* Open Graph / Facebook / WhatsApp / LinkedIn */}
      <meta property="og:site_name" content="WavDev" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="WavDev | Desarrollo Web y Apps Móviles en Guatemala" />
      <meta property="og:description" content="Construimos tu presencia digital. Páginas web, apps móviles, sistemas a la medida y outsourcing TI en Guatemala. Más de 50 proyectos entregados." />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content="WavDev — Agencia de Desarrollo Web en Guatemala" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_GT" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wavdev" />
      <meta name="twitter:title" content="WavDev | Desarrollo Web y Apps Móviles en Guatemala" />
      <meta name="twitter:description" content="Construimos tu presencia digital. Páginas web, apps móviles y sistemas a la medida en Guatemala." />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="WavDev — Agencia de Desarrollo Web en Guatemala" />

      <link rel="canonical" href={SITE_URL} />
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaWebSite)}</script>
    </Helmet>
  )
}

// ═══════════════════════════════════════════════════════════════
//  NAVBAR
// ═══════════════════════════════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { to: 'inicio',     label: 'Inicio'     },
    { to: 'servicios',  label: 'Servicios'  },
    { to: 'portafolio', label: 'Portafolio' },
    { to: 'historia',   label: 'Nosotros'   },
    { to: 'precios',    label: 'Precios'    },
    { to: 'contacto', label: 'Contacto' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0f]/85 backdrop-blur-2xl border-b border-white/8 shadow-xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5 select-none">
            <img src="/images/wavdev.webp" alt="WavDev" className="w-9 h-9 object-contain" />
            <span className="font-display font-bold text-lg text-white tracking-tight">WavDev</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <ScrollLink
                key={l.to} to={l.to} spy smooth duration={750} offset={-65}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-medium relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </ScrollLink>
            ))}
          </div>

          <div className="hidden md:block">
            <motion.a
              href={WA_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 0 18px rgba(37,211,102,0.35)' }}
            >
              <FaWhatsapp size={15} /> Cotizar
            </motion.a>
          </div>

          <button className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setOpen(!open)}>
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#0a0a0f]/95 backdrop-blur-2xl border-t border-white/8"
          >
            <div className="px-4 py-5 space-y-1">
              {links.map((l) => (
                <ScrollLink
                  key={l.to} to={l.to} spy smooth duration={750} offset={-65}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer text-sm font-medium transition-all"
                >
                  {l.label}
                </ScrollLink>
              ))}
              <a
                href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="block mt-3 text-center py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
                onClick={() => setOpen(false)}
              >
                Cotizar ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════════════
//  CAPÍTULO 1 — HERO
// ═══════════════════════════════════════════════════════════════
const TECH_STACK = [
  { Icon: SiReact,     label: 'React'    },
  { Icon: SiNextdotjs, label: 'Next.js'  },
  { Icon: SiVuedotjs,  label: 'Vue'      },
  { Icon: SiFlutter,   label: 'Flutter'  },
  { Icon: SiLaravel,   label: 'Laravel'  },
  { Icon: SiWordpress, label: 'WordPress'},
]

function HeroChapter({ onEnter }) {
  const [ref, inView] = useIO({ threshold: 0.4 })
  useEffect(() => { if (inView) onEnter?.() }, [inView])

  // Auto-scroll a servicios a los 5s si el usuario no ha scrolleado
  useEffect(() => {
    let userScrolled = false
    const onScroll = () => { userScrolled = true }
    window.addEventListener('scroll', onScroll, { once: true, passive: true })

    const timer = setTimeout(() => {
      if (!userScrolled) {
        const target = document.getElementById('servicios')
        if (target) {
          window.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
        }
      }
    }, 5000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative h-screen-real flex flex-col overflow-clip-ios"
      style={{ background: '#040C10' }}
    >
      {/* ── Aurora blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 600, height: 400, top: '-15%', right: '-10%', background: '#1BBCD822' }}
        />
        <motion.div
          className="absolute rounded-full blur-[160px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ width: 500, height: 350, bottom: '5%', left: '-8%', background: '#0DEAFF14' }}
        />
        <motion.div
          className="absolute rounded-full blur-[100px]"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ width: 300, height: 300, top: '40%', left: '45%', background: '#1BBCD810' }}
        />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(27,188,216,1) 1px,transparent 1px),linear-gradient(90deg,rgba(27,188,216,1) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Contenido central ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto w-full pt-20 sm:pt-24">

        {/* Badge + Eyebrow en misma fila */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-4 sm:mb-5 flex-wrap"
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: 'rgba(27,188,216,0.1)', border: '1px solid rgba(27,188,216,0.25)', color: '#1BBCD8' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1BBCD8] animate-pulse" />
            Disponible
          </div>
          <div className="flex items-center gap-2">
            <div className="h-px w-6" style={{ background: '#1BBCD8' }} />
            <span className="text-[#1BBCD8] text-[11px] font-semibold uppercase tracking-widest whitespace-nowrap">
              Agencia Digital · GT
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-4 sm:mb-5 select-none">
          {[
            { text: 'Diseñamos &',   cls: 'text-white/35 font-light' },
            { text: 'desarrollamos', cls: 'text-white font-black text-gradient' },
            { text: 'tu presencia.', cls: 'text-white font-black' },
          ].map(({ text, cls }, i) => (
            <div key={i} className="overflow-hidden leading-[1.05]">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.38 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                className={`font-display tracking-tight block ${cls}`}
                style={{ fontSize: 'clamp(2.4rem, 9vw, 7.5rem)' }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Descripción — solo 1 línea en móvil */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 max-w-lg"
        >
          Web, apps móviles y sistemas a la medida para negocios que quieren crecer en Guatemala.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="flex flex-wrap gap-2.5 mb-5"
        >
          <motion.a
            href={WA_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg,#1BBCD8,#0DEAFF)', color: '#040C10', boxShadow: '0 0 22px rgba(27,188,216,0.35)' }}
          >
            <FaWhatsapp size={15} /> Solicitar cotización
          </motion.a>
          <ScrollLink to="portafolio" smooth duration={900} offset={-65}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}
          >
            Ver proyectos <FiArrowRight size={12} />
          </ScrollLink>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.7 }}
          className="border-t pt-4 mt-1"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="grid grid-cols-4 gap-2">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display font-black text-white text-lg sm:text-2xl leading-none">
                  <AnimCounter target={s.n} suffix={s.s} />
                </span>
                <span className="text-white/25 text-[9px] sm:text-[10px] mt-1 text-center leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack — solo desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="hidden sm:flex flex-wrap items-center gap-2 mt-5"
        >
          <span className="text-white/20 text-[10px] uppercase tracking-widest mr-1">Stack</span>
          {TECH_STACK.map(({ Icon, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.45 + i * 0.06, duration: 0.35 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-white/40"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Icon size={10} />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-5 right-7 z-10 flex items-center gap-1.5"
        style={{ color: 'rgba(255,255,255,0.18)' }}
      >
        <span className="text-[9px] uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <FiChevronDown size={12} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
//  HISTORIA — scrollytelling pinned (300vh)
// ═══════════════════════════════════════════════════════════════
const HISTORIA_BEATS = [
  {
    fase:   '01 / Identidad',
    titulo: ['Somos una agencia', 'guatemalteca', 'que construye futuro.'],
    cuerpo: 'Nacimos con una misión clara: llevar tecnología de primer nivel a negocios de Guatemala y Centroamérica. No vendemos plantillas — construimos soluciones reales.',
    acento: '#1BBCD8',
    num:    '01',
  },
  {
    fase:   '02 / Misión',
    titulo: ['Diseño de clase', 'mundial + código', 'de alto rendimiento.'],
    cuerpo: 'Cada proyecto es una oportunidad de transformar un negocio. Combinamos creatividad, estrategia digital y desarrollo robusto para crear productos que generan resultados.',
    acento: '#0DEAFF',
    num:    '02',
  },
  {
    fase:   '03 / Números',
    titulo: ['Más de 50 proyectos.', '3 años de experiencia.', '100% de satisfacción.'],
    cuerpo: 'Nuestros resultados hablan solos. Desde startups hasta empresas consolidadas, hemos ayudado a negocios en Guatemala, Cobán y Jutiapa a dominar su presencia digital.',
    acento: '#7EEAFF',
    num:    '03',
  },
]

function ManifestoChapter({ onEnter }) {
  const containerRef = useRef(null)
  const [beat, setBeat]       = useState(0)
  const [prevBeat, setPrev]   = useState(0)
  const [localProg, setLocal] = useState(0)

  const [sectionRef, inView] = useIO({ threshold: 0.05 })
  useEffect(() => { if (inView) onEnter?.() }, [inView])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n   = HISTORIA_BEATS.length
    const idx = Math.min(Math.floor(v * n), n - 1)
    if (idx !== beat) { setPrev(beat); setBeat(idx) }
    setLocal((v * n) % 1)
  })

  const b = HISTORIA_BEATS[beat]

  return (
    <div ref={sectionRef} id="historia">
      <div ref={containerRef} style={{ height: 'calc(var(--vh, 1vh) * 300)' }}>
        <div
          className="sticky top-0 h-screen-real overflow-clip-ios transition-colors duration-700"
          style={{ background: `linear-gradient(145deg, #040C10 0%, #061A25 100%)` }}
        >
          {/* Aurora ambiental que cambia con el beat */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: 1 }}
            style={{ background: `radial-gradient(ellipse 65% 70% at 80% 30%, ${b.acento}15 0%, transparent 65%)` }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 40% 40% at 10% 80%, ${b.acento}0a 0%, transparent 55%)` }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {/* Número gigante de fondo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`h-ghost-${beat}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.7 }}
              className="absolute right-0 top-1/2 font-display font-black select-none pointer-events-none hidden sm:block"
              style={{
                fontSize: 'clamp(180px, 30vw, 380px)',
                color: b.acento,
                opacity: 0.04,
                transform: 'translateY(-46%) translateX(10%)',
                lineHeight: 1,
              }}
            >
              {b.num}
            </motion.div>
          </AnimatePresence>

          {/* Grid overlay sutil */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(${b.acento}88 1px,transparent 1px),linear-gradient(90deg,${b.acento}88 1px,transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Header */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-8 z-20">
            <motion.span
              animate={{ color: b.acento }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.38em] font-semibold"
            >
              Nuestra Historia
            </motion.span>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={beat}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: b.acento }}
                >
                  {b.num}
                </motion.span>
              </AnimatePresence>
              <span className="text-white/20">/ 03</span>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto overflow-y-auto pt-20 pb-24 lg:pt-0 lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={beat}
                initial={{ opacity: 0, y: 60, filter: 'blur(16px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)'  }}
                exit={{    opacity: 0, y: -50, filter: 'blur(12px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 w-full items-center"
              >
                {/* Izquierda — texto */}
                <div>
                  {/* Fase */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08, duration: 0.45 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <motion.div className="h-px" initial={{ width: 0 }} animate={{ width: 28 }} transition={{ delay: 0.1, duration: 0.4 }} style={{ background: b.acento }} />
                    <span className="text-[11px] uppercase tracking-[0.32em] font-semibold" style={{ color: b.acento }}>{b.fase}</span>
                  </motion.div>

                  {/* Título 3 líneas */}
                  <div className="mb-6">
                    {b.titulo.map((line, i) => (
                      <div key={i} className="overflow-hidden leading-[1.05]">
                        <motion.h2
                          initial={{ y: '105%' }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.06 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="font-display font-black text-white tracking-tight block"
                          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.8rem)' }}
                        >
                          {line}
                        </motion.h2>
                      </div>
                    ))}
                  </div>

                  {/* Descripción */}
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.55 }}
                    className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
                  >
                    {b.cuerpo}
                  </motion.p>

                  {/* CTA en el último beat */}
                  {beat === 2 && (
                    <motion.a
                      href={WA_URL} target="_blank" rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm"
                      style={{ background: `linear-gradient(135deg,${b.acento},${b.acento}bb)`, color: '#040C10' }}
                    >
                      <FaWhatsapp size={15} /> Empecemos tu proyecto
                    </motion.a>
                  )}
                </div>

                {/* Derecha — stat cards o línea de tiempo */}
                <div className="hidden lg:grid grid-cols-2 gap-3">
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                      className="p-5 rounded-2xl flex flex-col gap-1"
                      style={{
                        background: `${b.acento}08`,
                        border: `1px solid ${b.acento}20`,
                      }}
                    >
                      <span className="font-display font-black text-3xl text-white">
                        <AnimCounter target={stat.n} suffix={stat.s} />
                      </span>
                      <span className="text-slate-500 text-xs">{stat.label}</span>
                      <div className="h-px mt-1 rounded-full" style={{ background: `${b.acento}30` }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Barra de progreso inferior */}
          <div className="absolute bottom-0 inset-x-0 px-6 sm:px-10 lg:px-16 pb-7 z-20">
            <div className="hidden md:flex justify-between mb-2.5">
              {HISTORIA_BEATS.map((hb, i) => (
                <motion.span
                  key={i}
                  className="text-[9px] uppercase tracking-widest"
                  animate={{ color: i === beat ? hb.acento : 'rgba(255,255,255,0.1)', fontWeight: i === beat ? 700 : 400 }}
                >
                  {hb.fase}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {HISTORIA_BEATS.map((hb, i) => (
                <div key={i} className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: hb.acento, transformOrigin: 'left' }}
                    animate={{ scaleX: i < beat ? 1 : i === beat ? localProg : 0 }}
                    transition={{ duration: 0.06 }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  INTRO SERVICIOS — transición Hero → Servicios
// ═══════════════════════════════════════════════════════════════
function ServicesIntro() {
  const containerRef = useRef(null)
  const [count, setCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity   = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0])
  const y         = useTransform(scrollYProgress, [0, 1], [70, -70])
  const lineW     = useTransform(scrollYProgress, [0.12, 0.55], ['0%', '100%'])
  const numScale  = useTransform(scrollYProgress, [0.15, 0.5], [3, 1])
  const numOp     = useTransform(scrollYProgress, [0.15, 0.4, 0.78, 1], [0, 1, 1, 0])
  const glowOp    = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.5, 0])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const t = Math.max(0, Math.min(1, (v - 0.18) / 0.42))
    setCount(Math.round(t * 4))
  })

  const svcLabels = [
    { label: 'Desarrollo Web',       color: SVC_THEMES[0].accent, num: '01' },
    { label: 'Apps Móviles',          color: SVC_THEMES[1].accent, num: '02' },
    { label: 'Sistemas a la Medida',  color: SVC_THEMES[2].accent, num: '03' },
    { label: 'Outsourcing de TI',     color: SVC_THEMES[3].accent, num: '04' },
  ]

  return (
    <div
      ref={containerRef}
      className="relative h-screen-real flex items-center justify-center overflow-clip-ios"
      style={{ background: '#040C10' }}
    >
      {/* Glow ambiental */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: glowOp,
          background: 'radial-gradient(ellipse 75% 60% at 50% 50%, #C9A87C12 0%, #1BBCD818 50%, transparent 75%)',
        }}
      />

      {/* Líneas horizontales decorativas */}
      {[15, 35, 65, 85].map((top, i) => (
        <motion.div
          key={i}
          className="absolute left-0 h-px pointer-events-none"
          style={{
            top: `${top}%`,
            background: `linear-gradient(90deg, transparent, ${svcLabels[i].color}22, transparent)`,
            opacity: glowOp,
          }}
          animate={{ width: ['0%', '100%', '0%'] }}
          transition={{ duration: 4 + i, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Número gigante de fondo — centrado */}
      <motion.div
        className="absolute font-display font-black select-none pointer-events-none text-center"
        style={{
          fontSize: 'clamp(220px, 44vw, 540px)',
          color: '#C9A87C',
          opacity: numOp,
          scale: numScale,
          lineHeight: 1,
        }}
      >
        {String(count).padStart(2, '0')}
      </motion.div>

      {/* Contenido central */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 w-full max-w-3xl mx-auto select-none">

        {/* Línea superior */}
        <div className="flex items-center justify-center mb-7">
          <motion.div
            className="h-px"
            style={{ width: lineW, background: 'linear-gradient(90deg,transparent,#C9A87C,#1BBCD8,transparent)' }}
          />
        </div>

        {/* Label */}
        <motion.p style={{ opacity }} className="text-[11px] uppercase tracking-[0.5em] font-semibold mb-5" style={{ color: '#1BBCD8' }}>
          Lo que hacemos
        </motion.p>

        {/* Título */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            style={{ y }}
            className="font-display font-black text-white leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(3.2rem, 12vw, 9rem)' }}
          >
            Servicios
          </motion.h2>
        </div>

        <motion.p style={{ opacity }} className="text-slate-500 text-sm sm:text-base mb-10">
          <span style={{ color: '#C9A87C', fontWeight: 700 }}>{count}</span> soluciones que impulsan tu negocio digital
        </motion.p>

        {/* Lista de servicios que aparecen */}
        <motion.div style={{ opacity }} className="flex flex-col gap-2 w-full">
          {svcLabels.map(({ label, color, num }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: count > i ? 1 : 0.1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 px-5 py-3 rounded-xl"
              style={{
                background: count > i ? `rgba(4,12,16,0.82)` : 'rgba(4,12,16,0.65)',
                border: `1px solid ${count > i ? color + '40' : 'rgba(255,255,255,0.07)'}`,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.4s ease',
              }}
            >
              <span className="font-mono text-[11px]" style={{ color: count > i ? color : 'rgba(255,255,255,0.15)' }}>{num}</span>
              <div className="h-px flex-1" style={{ background: count > i ? `${color}30` : 'rgba(255,255,255,0.05)' }} />
              <span
                className="font-display font-bold text-sm sm:text-base tracking-wide"
                style={{ color: count > i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)' }}
              >
                {label}
              </span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                animate={count > i ? { scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.15 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ background: color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Flecha */}
        <motion.div style={{ opacity }} className="flex flex-col items-center gap-2 mt-8"
          animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <div className="w-px h-7 bg-gradient-to-b from-[#1BBCD8] to-transparent rounded-full" />
          <FiChevronDown size={15} className="text-[#1BBCD8]" />
        </motion.div>
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  CAPÍTULO 3 — SERVICIOS (PINNED SCROLL 400vh)
// ═══════════════════════════════════════════════════════════════
function ServicesChapter({ onEnter }) {
  const containerRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [localProgress, setLocalProgress] = useState(0)

  const [sectionRef, inView] = useIO({ threshold: 0.1 })
  useEffect(() => { if (inView) onEnter?.() }, [inView])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * 4), 3)
    setActiveIdx(idx)
    setLocalProgress((v * 4) % 1)
  })

  const theme = SVC_THEMES[activeIdx]
  const svc = SERVICES[activeIdx]

  return (
    <div ref={sectionRef} id="servicios">
      <div ref={containerRef} style={{ height: 'calc(var(--vh, 1vh) * 400)' }}>
        <div
          className="sticky top-0 h-screen-real overflow-clip-ios transition-colors duration-700"
          style={{ background: `linear-gradient(145deg,${theme.bg} 0%,${theme.bgAlt} 100%)` }}
        >
          {/* Número decorativo de fondo */}
          <div
            className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none leading-none"
            style={{
              fontSize: 'clamp(120px,22vw,220px)',
              color: theme.accent,
              opacity: 0.06,
            }}
          >
            {svc.num}
          </div>

          {/* Label de sección */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.35em] px-4 py-1.5 rounded-full border"
              style={{ color: theme.accent, borderColor: `${theme.accent}30`, background: `${theme.accent}10` }}
            >
              Nuestros Servicios
            </span>
          </div>

          {/* Indicador lateral izquierdo */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
            {SERVICES.map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                animate={{ opacity: i === activeIdx ? 1 : 0.22 }}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    height: i === activeIdx ? 32 : 4,
                    width: 3,
                    backgroundColor: i === activeIdx ? theme.accent : 'rgba(255,255,255,0.3)',
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Contenido principal */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-12 lg:px-16 flex items-center overflow-y-auto pt-16 pb-20 lg:pt-0 lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="grid lg:grid-cols-2 gap-6 lg:gap-20 w-full items-center"
              >
                {/* Imagen móvil — visible solo en < lg */}
                <div className="lg:hidden w-full relative rounded-xl overflow-hidden"
                  style={{
                    border: `1px solid ${theme.accent}22`,
                    boxShadow: `0 0 30px ${theme.accent}18`,
                    background: theme.bg,
                    maxHeight: '170px',
                  }}
                >
                  <img
                    src={svc.image}
                    alt={svc.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                    style={{ display: 'block', objectFit: 'contain', maxHeight: '170px' }}
                  />
                  {/* Gradiente inferior con etiqueta */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{ background: `linear-gradient(to top, ${theme.bg}f0 0%, transparent 100%)` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-5 rounded-full" style={{ background: theme.accent }} />
                      <span className="font-display font-bold text-white text-sm">{svc.title}</span>
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{ background: `${theme.accent}20`, color: theme.accent, border: `1px solid ${theme.accent}30` }}
                    >
                      {svc.num}
                    </span>
                  </div>
                </div>

                {/* Izquierda: info del servicio */}
                <div>
                  <div className="font-display font-black text-5xl sm:text-7xl lg:text-9xl leading-none mb-2 lg:mb-6"
                    style={{ color: theme.accent, opacity: 0.6 }}>
                    {svc.num}
                  </div>
                  <h2 className="font-display font-black text-white leading-tight mb-1 lg:mb-4"
                    style={{ fontSize: 'clamp(1.5rem,5vw,3.5rem)' }}>
                    {svc.title}
                  </h2>
                  <p className="text-sm lg:text-lg font-medium mb-2 lg:mb-5"
                    style={{ color: theme.accent }}>
                    {svc.tagline}
                  </p>
                  <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-3 lg:mb-8 max-w-lg">
                    {svc.detail}
                  </p>

                  {/* Bullets */}
                  <div className="grid grid-cols-2 gap-1.5 lg:gap-2.5 mb-4 lg:mb-10">
                    {svc.bullets.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="flex items-center gap-2 text-xs lg:text-sm text-slate-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: theme.accent }} />
                        {b}
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href={WA_URL} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, x: 4 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-7 lg:py-3.5 rounded-full font-semibold text-white text-sm"
                    style={{ background: `linear-gradient(135deg,${theme.accent},${theme.accent}bb)` }}
                  >
                    <FaWhatsapp size={15} /> Consultar servicio
                  </motion.a>
                </div>

                {/* Derecha: browser mockup con imagen del servicio */}
                <div className="hidden lg:flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                    style={{ filter: `drop-shadow(0 30px 80px ${theme.accent}28)` }}
                  >
                    {/* Glow detrás */}
                    <div
                      className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none"
                      style={{ background: `${theme.accent}12` }}
                    />
                    {/* Marco navegador */}
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        width: 'clamp(320px, 28vw, 480px)',
                        border: `1px solid ${theme.accent}30`,
                        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.6)`,
                        background: '#0a0e14',
                      }}
                    >
                      {/* Barra título browser */}
                      <div
                        className="flex items-center gap-2 px-4 py-3 border-b"
                        style={{ borderColor: `${theme.accent}18`, background: 'rgba(255,255,255,0.03)' }}
                      >
                        <div className="flex gap-1.5">
                          {['#FF5F57','#FEBC2E','#28C840'].map((c) => (
                            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                          ))}
                        </div>
                        <div
                          className="flex-1 mx-2 px-3 py-1 rounded-md text-[10px] font-mono truncate"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.25)',
                            border: '1px solid rgba(255,255,255,0.07)',
                          }}
                        >
                          wavdev.lat / {svc.title.toLowerCase().replace(/\s/g, '-')}
                        </div>
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono shrink-0"
                          style={{ background: `${theme.accent}15`, color: theme.accent, border: `1px solid ${theme.accent}28` }}
                        >
                          <svc.Icon size={9} />
                          {svc.num}
                        </div>
                      </div>
                      {/* Screenshot */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                        <img
                          src={svc.image}
                          alt={svc.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                          style={{ display: 'block' }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(to bottom, transparent 60%, ${theme.accent}08 100%)` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Barra de progreso inferior */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            {/* Labels de servicios */}
            <div className="flex justify-between mb-3 max-w-2xl mx-auto">
              {SERVICES.map((s, i) => (
                <span
                  key={i}
                  className="text-[10px] uppercase tracking-widest transition-all duration-500"
                  style={{ color: i === activeIdx ? theme.accent : 'rgba(255,255,255,0.18)' }}
                >
                  {SVC_THEMES[i].label}
                </span>
              ))}
            </div>
            {/* Barra segmentada */}
            <div className="flex gap-1.5 max-w-2xl mx-auto">
              {SERVICES.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: SVC_THEMES[i].accent }}
                    animate={{
                      scaleX: i < activeIdx ? 1 : i === activeIdx ? localProgress : 0,
                    }}
                    transition={{ duration: 0.1 }}
                    style={{ background: SVC_THEMES[i].accent, transformOrigin: 'left' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2" style={{ color: `${theme.accent}50` }}>
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <FiChevronDown size={14} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  TRANSICIÓN — SERVICIOS → PORTAFOLIO
// ═══════════════════════════════════════════════════════════════
function BridgeChapter() {
  const containerRef = useRef(null)
  const [count, setCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y        = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity  = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0])
  const lineW    = useTransform(scrollYProgress, [0.15, 0.65], ['0%', '100%'])
  const glowOp   = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.55, 0])
  const numScale = useTransform(scrollYProgress, [0.2, 0.55], [2.8, 1])
  const numOp    = useTransform(scrollYProgress, [0.2, 0.45, 0.75, 1], [0, 1, 1, 0])

  // Contador 0 → 6 basado en scroll
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const t = Math.max(0, Math.min(1, (v - 0.2) / 0.45))
    setCount(Math.round(t * 6))
  })

  return (
    <div
      ref={containerRef}
      className="relative h-screen-real flex items-center justify-center overflow-clip-ios"
      style={{ background: '#040C10' }}
    >
      {/* Glow ambiental */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: glowOp,
          background: 'radial-gradient(ellipse 70% 55% at 50% 50%, #1BBCD828 0%, transparent 70%)',
        }}
      />

      {/* Partículas */}
      {Array.from({ length: 18 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: (i % 3) + 1,
            height: (i % 3) + 1,
            left: `${(i * 47 + 13) % 100}%`,
            top: `${(i * 31 + 7) % 100}%`,
            background: i % 2 === 0 ? '#1BBCD8' : '#0DEAFF',
            opacity: glowOp,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3 + (i % 4), delay: i * 0.2, repeat: Infinity }}
        />
      ))}

      {/* Número gigante con contador — fondo decorativo */}
      <motion.div
        className="absolute font-display font-black select-none pointer-events-none text-center"
        style={{
          fontSize: 'clamp(220px, 42vw, 520px)',
          color: '#1BBCD8',
          opacity: numOp,
          scale: numScale,
          lineHeight: 1,
        }}
      >
        {String(count).padStart(2, '0')}
      </motion.div>

      {/* Contenido central — encima del número */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 select-none"
      >
        {/* Línea superior */}
        <div className="flex items-center justify-center mb-8">
          <motion.div
            className="h-px"
            style={{
              width: lineW,
              background: 'linear-gradient(90deg, transparent, #1BBCD8, transparent)',
            }}
          />
        </div>

        {/* Label */}
        <p className="text-[#1BBCD8] text-[11px] uppercase tracking-[0.5em] font-semibold mb-5">
          Nuestro trabajo habla por sí solo
        </p>

        {/* Título masivo */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            style={{ y }}
            className="font-display font-black text-white leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 10rem)' }}
          >
            Proyectos
          </motion.h2>
        </div>

        {/* Subtítulo con fondo oscuro para legibilidad */}
        <div
          className="inline-block px-5 py-2.5 rounded-full mb-8"
          style={{
            background: 'rgba(4, 12, 16, 0.85)',
            border: '1px solid rgba(27, 188, 216, 0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <p className="text-white text-sm sm:text-base tracking-wide">
            <span className="text-[#1BBCD8] font-bold">{count}</span>
            {' '}soluciones digitales que transformaron negocios reales
          </p>
        </div>

        {/* Contador de proyectos */}
        <motion.div
          style={{ opacity }}
          className="flex items-center justify-center gap-6 mt-10"
        >
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: proj.color }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, delay: i * 0.25, repeat: Infinity }}
            />
          ))}
        </motion.div>

        {/* Flecha scroll */}
        <motion.div
          style={{ opacity }}
          className="flex flex-col items-center gap-2 mt-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-[#1BBCD8] to-transparent rounded-full" />
          <FiChevronDown size={16} className="text-[#1BBCD8]" />
        </motion.div>
      </motion.div>

      {/* Línea inferior */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #1BBCD820, transparent)' }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  CAPÍTULO 4 — PORTAFOLIO (scrollytelling vertical, 1 proyecto/pantalla)
// ═══════════════════════════════════════════════════════════════

/* Descripción larga de cada proyecto para el storytelling */
const PROJECT_STORIES = [
  'Plataforma de comercio electrónico de lujo con catálogo premium, carrito inteligente y experiencia de compra exclusiva para una marca de diseño de alto nivel.',
  'CRM de ventas con pipeline visual, automatización de leads, reportes en tiempo real y herramientas de productividad para equipos comerciales de alto rendimiento.',
  'Portal inmobiliario de alta gama con búsqueda avanzada de propiedades, tours virtuales 360° y gestión de citas para asesores y compradores exigentes.',
  'Plataforma integral de recursos humanos con reclutamiento IA, gestión de talento, evaluaciones de desempeño y analytics de equipo en tiempo real.',
  'Solución tecnológica empresarial con módulos de cloud, ciberseguridad, gestión de infraestructura y soporte 24/7 para corporaciones en expansión.',
  'Sitio web de resort y wellness de lujo con sistema de reservas en línea, catálogo de experiencias, galería inmersiva y gestión de disponibilidad.',
]

function PortfolioChapter({ onEnter }) {
  const outerRef    = useRef(null)   // para onEnter (IO)
  const containerRef = useRef(null)  // para useScroll

  const [activeIdx, setActiveIdx]   = useState(0)
  const [prevIdx,   setPrevIdx]     = useState(0)
  const [localProg, setLocalProg]   = useState(0)

  // Notifica sección activa al padre
  const [sectionRef, inView] = useIO({ threshold: 0.05 })
  useEffect(() => { if (inView) onEnter?.() }, [inView])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n   = PROJECTS.length
    const idx = Math.min(Math.floor(v * n), n - 1)
    if (idx !== activeIdx) {
      setPrevIdx(activeIdx)
      setActiveIdx(idx)
    }
    setLocalProg((v * n) % 1)
  })

  const p = PROJECTS[activeIdx]

  return (
    <div ref={sectionRef} id="portafolio">
      <div ref={containerRef} style={{ height: `calc(var(--vh, 1vh) * ${PROJECTS.length * 100})` }}>

        <div
          className="sticky top-0 h-screen-real overflow-clip-ios"
          style={{ background: '#05050a' }}
        >
          {/* ── Fondo atmosférico principal ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: 1 }}
            style={{
              background: `radial-gradient(ellipse 60% 80% at 85% 40%, ${p.color}18 0%, transparent 65%)`,
            }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />
          {/* Glow frío abajo-izquierda */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 45% 45% at 8% 88%, ${p.color}0d 0%, transparent 55%)`,
            }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
          {/* Vignette perimetral */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(5,5,10,0.65) 100%)',
            }}
          />

          {/* Textura de ruido sutil */}
          <div
            className="absolute inset-0 opacity-[0.022] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          {/* Número fantasma gigante — solo visible en desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`ghost-${activeIdx}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{    opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute right-0 top-1/2 -translate-y-[46%] font-display font-black
                         select-none pointer-events-none leading-none hidden sm:block"
              style={{
                fontSize: 'clamp(160px, 26vw, 340px)',
                color: p.color,
                opacity: 0.042,
                transform: 'translateY(-46%) translateX(8%)',
              }}
            >
              {String(activeIdx + 1).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>

          {/* Línea decorativa vertical derecha */}
          <div
            className="absolute right-[22%] top-0 bottom-0 w-px pointer-events-none hidden xl:block"
            style={{ background: `linear-gradient(to bottom, transparent, ${p.color}18, transparent)` }}
          />

          {/* ── Header ── */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between
                          px-6 sm:px-10 lg:px-16 pt-8 z-20">
            <motion.span
              animate={{ color: p.color }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.38em] font-semibold"
            >
              Nuestros Proyectos
            </motion.span>

            {/* Contador animado */}
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIdx}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0,   opacity: 1 }}
                  exit={{    y:  10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: p.color }}
                >
                  {String(activeIdx + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className="text-white/20">/ {String(PROJECTS.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* ── Contenido principal ── */}
          <div className="relative z-10 h-full flex items-center overflow-y-auto
                          px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto
                          pt-20 pb-24 lg:pt-0 lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 60,  filter: 'blur(16px)' }}
                animate={{ opacity: 1, y: 0,   filter: 'blur(0px)'  }}
                exit={{    opacity: 0, y: -50,  filter: 'blur(12px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-20 w-full items-center"
              >
                {/* ─ Imagen móvil: visible solo en < lg ─ */}
                <div className="lg:hidden w-full rounded-xl overflow-hidden"
                  style={{
                    border: `1px solid ${p.color}28`,
                    boxShadow: `0 0 40px ${p.color}18`,
                    aspectRatio: '16/9',
                  }}
                >
                  {/* Barra browser mini */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-2"
                    style={{ background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid ${p.color}15` }}
                  >
                    {['#FF5F57','#FEBC2E','#28C840'].map((c) => (
                      <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                    ))}
                    <div
                      className="flex-1 mx-2 px-2 py-0.5 rounded text-[9px] font-mono truncate"
                      style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)' }}
                    >
                      {p.name.toLowerCase().replace(/\s/g,'')}.com
                    </div>
                  </div>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover object-top"
                    style={{ height: 'calc(100% - 32px)', display: 'block' }}
                  />
                </div>

                {/* ─ Columna izquierda: storytelling ─ */}
                <div className="max-w-2xl">

                  {/* Etiqueta de categoría */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08, duration: 0.45 }}
                    className="flex items-center gap-3 mb-5"
                  >
                    <motion.div
                      className="h-px"
                      initial={{ width: 0 }}
                      animate={{ width: 28 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      style={{ background: p.color }}
                    />
                    <span
                      className="text-[11px] uppercase tracking-[0.32em] font-semibold"
                      style={{ color: p.color }}
                    >
                      {p.category}
                    </span>
                  </motion.div>

                  {/* Nombre del proyecto — tipografía masiva */}
                  <div className="overflow-hidden mb-5">
                    <motion.h2
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.06, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display font-black text-white leading-[0.9] tracking-tight"
                      style={{ fontSize: 'clamp(3.2rem, 9.5vw, 8rem)' }}
                    >
                      {p.name}
                    </motion.h2>
                  </div>

                  {/* Descripción / historia del proyecto */}
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.55 }}
                    className="text-slate-400 text-base sm:text-lg leading-relaxed mb-7 max-w-xl"
                  >
                    {PROJECT_STORIES[activeIdx]}
                  </motion.p>

                  {/* Tech badge + CTA fila */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-wrap items-center gap-5"
                  >
                    {/* Badge tecnología */}
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-sm"
                      style={{
                        borderColor: `${p.color}42`,
                        background:  `${p.color}10`,
                        color: p.color,
                      }}
                    >
                      <p.TechIcon size={13} />
                      {p.tech}
                    </div>

                    {/* Botón / link */}
                    <motion.a
                      href={WA_URL} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-white/50
                                 hover:text-white transition-colors group"
                      whileHover={{ x: 4 }}
                    >
                      Solicitar proyecto similar
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.7, repeat: Infinity }}
                        style={{ color: p.color }}
                      >
                        <FiArrowRight size={15} />
                      </motion.span>
                    </motion.a>
                  </motion.div>
                </div>

                {/* ─ Columna derecha: browser mockup con screenshot ─ */}
                <div className="hidden lg:flex items-center justify-center lg:pr-8">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                    style={{
                      filter: `drop-shadow(0 30px 80px ${p.color}30)`,
                    }}
                  >
                    {/* Glow detrás del browser */}
                    <div
                      className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none"
                      style={{ background: `${p.color}14` }}
                    />

                    {/* Marco del navegador */}
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        width: 'clamp(320px, 28vw, 480px)',
                        border: `1px solid ${p.color}30`,
                        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.6)`,
                        background: '#0a0e14',
                      }}
                    >
                      {/* Barra de título del browser */}
                      <div
                        className="flex items-center gap-2 px-4 py-3 border-b"
                        style={{ borderColor: `${p.color}18`, background: 'rgba(255,255,255,0.03)' }}
                      >
                        {/* Semáforos */}
                        <div className="flex gap-1.5">
                          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                          ))}
                        </div>
                        {/* Barra de URL */}
                        <div
                          className="flex-1 mx-2 px-3 py-1 rounded-md text-[10px] font-mono truncate"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.25)',
                            border: '1px solid rgba(255,255,255,0.07)',
                          }}
                        >
                          {p.name.toLowerCase().replace(/\s/g, '')}.com
                        </div>
                        {/* Badge de tech */}
                        <div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono shrink-0"
                          style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}28` }}
                        >
                          <p.TechIcon size={9} />
                          {p.tech.split(' ')[0]}
                        </div>
                      </div>

                      {/* Screenshot del proyecto */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                          style={{ display: 'block' }}
                        />
                        {/* Overlay sutil con el color del proyecto */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(to bottom, transparent 60%, ${p.color}08 100%)` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Footer: labels + barra segmentada ── */}
          <div className="absolute bottom-0 inset-x-0 z-20 px-6 sm:px-10 lg:px-16 pb-7">

            {/* Nombres de proyectos */}
            <div className="hidden md:flex justify-between mb-2.5">
              {PROJECTS.map((proj, i) => (
                <motion.span
                  key={i}
                  className="text-[9px] uppercase tracking-widest transition-all duration-500
                             truncate max-w-[80px] text-center"
                  animate={{
                    color:      i === activeIdx ? proj.color : 'rgba(255,255,255,0.1)',
                    fontWeight: i === activeIdx ? 700 : 400,
                  }}
                >
                  {proj.name}
                </motion.span>
              ))}
            </div>

            {/* Segmentos de progreso */}
            <div className="flex gap-[3px]">
              {PROJECTS.map((proj, i) => (
                <div
                  key={i}
                  className="flex-1 h-[2px] rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: proj.color, transformOrigin: 'left' }}
                    animate={{
                      scaleX: i < activeIdx ? 1 : i === activeIdx ? localProg : 0,
                    }}
                    transition={{ duration: 0.06 }}
                  />
                </div>
              ))}
            </div>

            {/* Hint de scroll */}
            <div className="flex justify-end mt-3">
              <motion.div
                className="flex items-center gap-1.5"
                animate={{ opacity: localProg > 0.85 ? [0.5, 1, 0.5] : 0.3 }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ color: p.color }}
              >
                <span className="text-[9px] uppercase tracking-[0.3em]">Siguiente</span>
                <FiChevronDown size={11} />
              </motion.div>
            </div>
          </div>

        </div>{/* /sticky */}
      </div>{/* /containerRef */}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  CAPÍTULO 5 — PRECIOS
// ═══════════════════════════════════════════════════════════════
function PlanCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.16, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="relative flex flex-col p-8 rounded-2xl border"
      style={{
        background: plan.featured
          ? `linear-gradient(145deg,${plan.color}14,${plan.color}06)`
          : 'rgba(255,255,255,0.025)',
        borderColor: plan.featured ? `${plan.color}55` : 'rgba(255,255,255,0.08)',
        boxShadow: plan.featured ? `0 0 50px ${plan.color}18` : 'none',
      }}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full text-[11px] font-bold text-white tracking-wide"
            style={{ background: `linear-gradient(135deg,${plan.color},${plan.color}aa)` }}>
            {plan.badge}
          </span>
        </div>
      )}
      {plan.featured && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: [`0 0 0px ${plan.color}00`, `0 0 35px ${plan.color}35`, `0 0 0px ${plan.color}00`] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
      )}
      <div className="mb-5">
        <h3 className="font-display font-bold text-xl text-white mb-1">{plan.name}</h3>
        <p className="text-slate-400 text-sm">{plan.desc}</p>
      </div>
      <div className="mb-7">
        <span className="font-display font-extrabold text-5xl text-white">{plan.price}</span>
        <span className="text-slate-400 text-sm">{plan.period}</span>
      </div>
      <ul className="space-y-3 mb-7 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${plan.color}22` }}>
              <FaCheck size={9} style={{ color: plan.color }} />
            </div>
            <span className="text-slate-300 text-sm">{f}</span>
          </li>
        ))}
        {plan.extra && (
          <li className="text-slate-500 text-xs pt-2 border-t border-white/8">{plan.extra}</li>
        )}
      </ul>
      <motion.a
        href={WA_URL} target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
          plan.featured ? 'text-white' : 'text-white border border-white/15 hover:border-white/30'
        }`}
        style={plan.featured ? { background: `linear-gradient(135deg,${plan.color},${plan.color}bb)` } : {}}
      >
        <span className="flex items-center justify-center gap-2">
          <FaWhatsapp size={15} /> Solicitar Cotización
        </span>
      </motion.a>
    </motion.div>
  )
}

function PricingChapter({ onEnter }) {
  const [ref, inView] = useIO({ threshold: 0.2 })
  useEffect(() => { if (inView) onEnter?.() }, [inView])

  return (
    <section
      ref={ref}
      id="precios"
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#0a0a0f 0%,#080f1f 50%,#0a0a0f 100%)' }}
    >
      {/* Glow decorativo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,#0DEAFF,transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurIn className="text-[11px] uppercase tracking-[0.3em] text-blue-500/60 mb-4 font-semibold">
            Inversión
          </BlurIn>
          <RevealWords
            text="Planes y Precios"
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white"
          />
          <BlurIn delay={0.3} className="text-slate-500 max-w-lg mx-auto text-base mt-5">
            Elige el plan que mejor se adapte a las necesidades de tu negocio
          </BlurIn>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
//  CAPÍTULO 6 — CONTACTO
// ═══════════════════════════════════════════════════════════════
function ContactChapter({ onEnter }) {
  const [ref, inView] = useIO({ threshold: 0.2 })
  useEffect(() => { if (inView) onEnter?.() }, [inView])

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.email.trim()) e.email = 'El correo es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido'
    if (!form.message.trim()) e.message = 'El mensaje es requerido'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1600))
    setStatus('sent')
  }

  const field = (name) =>
    `w-full px-4 py-3.5 rounded-xl text-white placeholder-slate-600 text-sm outline-none transition-all bg-white/[0.04] border ${
      errors[name] ? 'border-red-500/50 bg-red-500/5' : 'border-white/8 focus:border-blue-500/50 focus:bg-blue-500/5'
    }`

  return (
    <section
      ref={ref}
      id="contacto"
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ background: '#040C10' }}
    >
      {/* Halo esquina */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#1BBCD8,transparent)', transform: 'translate(30%,-30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurIn className="text-[11px] uppercase tracking-[0.3em] text-blue-500/60 mb-4 font-semibold">
            Hablemos
          </BlurIn>
          <RevealWords
            text="Contáctanos"
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white"
          />
          <BlurIn delay={0.3} className="text-slate-500 max-w-lg mx-auto text-base mt-5">
            ¿Listo para transformar tu negocio? Cuéntanos tu proyecto
          </BlurIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Formulario */}
          <BlurIn delay={0.1}>
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="min-h-[380px] flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-green-500/25 bg-green-500/[0.04]"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-5">
                  <FaCheck size={26} className="text-green-400" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">¡Mensaje enviado!</h3>
                <p className="text-slate-400 text-sm mb-7">Te contactaremos muy pronto.</p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white border border-white/15 hover:bg-white/8 transition-all"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Nombre</label>
                  <input type="text" value={form.name} placeholder="Tu nombre completo"
                    onChange={(e) => setForm({ ...form, name: e.target.value })} className={field('name')} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Correo</label>
                  <input type="email" value={form.email} placeholder="tu@correo.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} className={field('email')} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Mensaje</label>
                  <textarea rows={5} value={form.message} placeholder="Cuéntanos sobre tu proyecto..."
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${field('message')} resize-none`} />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <motion.button
                  type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 mt-2"
                  style={{ background: 'linear-gradient(135deg,#1BBCD8,#0DEAFF)', opacity: status === 'sending' ? 0.75 : 1 }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      Enviando…
                    </>
                  ) : (
                    <><FiSend size={16} /> Enviar Mensaje</>
                  )}
                </motion.button>
              </form>
            )}
          </BlurIn>

          {/* Datos de contacto */}
          <BlurIn delay={0.25} className="space-y-7">
            <div className="space-y-4">
              {[
                { Icon: FiMail, text: 'contactowavdev@gmail.com', href: 'mailto:contactowavdev@gmail.com' },
                { Icon: FiPhone, text: '+502 3853 6836', href: 'tel:+50238536836' },
                { Icon: FiMapPin, text: 'Guatemala City · Cobán · Jutiapa', href: null },
              ].map(({ Icon, text, href }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/18 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-blue-400" size={16} />
                  </div>
                  {href
                    ? <a href={href} className="text-slate-300 hover:text-white transition-colors text-sm">{text}</a>
                    : <span className="text-slate-300 text-sm">{text}</span>}
                </div>
              ))}
            </div>

            {/* Redes */}
            <div className="flex gap-3 pt-2">
              <motion.a href={WA_URL} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/8 hover:border-green-500/40 hover:bg-green-500/10 transition-all">
                <FaWhatsapp className="text-green-400" size={19} />
              </motion.a>
              <motion.a href={LI_URL} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/8 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all">
                <FaLinkedin className="text-blue-400" size={19} />
              </motion.a>
            </div>

            {/* CTA WhatsApp */}
            <motion.a
              href={WA_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-green-500/18 bg-green-500/[0.04] hover:bg-green-500/8 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="text-green-400" size={22} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Chat directo por WhatsApp</p>
                <p className="text-slate-500 text-xs mt-0.5">Respuesta inmediata · +502 3853 6836</p>
              </div>
            </motion.a>
          </BlurIn>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
//  MODAL LEGAL
// ═══════════════════════════════════════════════════════════════
const LEGAL_CONTENT = {
  'Términos de Servicio': {
    titulo: 'Términos de Servicio',
    secciones: [
      {
        heading: '1. Aceptación de los términos',
        body: 'Al contratar los servicios de WavDev, el cliente acepta los presentes términos y condiciones en su totalidad. WavDev se reserva el derecho de modificar estos términos en cualquier momento con previo aviso.',
      },
      {
        heading: '2. Servicios ofrecidos',
        body: 'WavDev ofrece servicios de desarrollo web, aplicaciones móviles, sistemas a la medida y outsourcing de TI. Cada proyecto se rige por un contrato específico que detalla alcance, plazos y costos acordados.',
      },
      {
        heading: '3. Pagos y facturación',
        body: 'Los proyectos requieren un anticipo del 50% para iniciar el desarrollo. El saldo restante se cancela al entregar el proyecto. Los pagos pueden realizarse mediante transferencia bancaria o medios acordados con el cliente.',
      },
      {
        heading: '4. Propiedad intelectual',
        body: 'Una vez liquidado el pago total, el cliente adquiere todos los derechos sobre el producto final. WavDev conserva el derecho de incluir el proyecto en su portafolio salvo acuerdo contrario.',
      },
      {
        heading: '5. Garantía y soporte',
        body: 'WavDev ofrece 30 días de garantía post-entrega para corrección de errores sin costo adicional. El mantenimiento y nuevas funciones posteriores a este período se cotizan por separado.',
      },
      {
        heading: '6. Limitación de responsabilidad',
        body: 'WavDev no se responsabiliza por daños derivados del uso indebido del software entregado, ataques de terceros o interrupciones de servicios externos (hosting, APIs, etc.) fuera de nuestro control.',
      },
    ],
  },
  'Privacidad': {
    titulo: 'Política de Privacidad',
    secciones: [
      {
        heading: '1. Datos que recopilamos',
        body: 'Recopilamos únicamente los datos necesarios para brindar nuestros servicios: nombre, correo electrónico, número de teléfono y detalles del proyecto. No recopilamos datos sensibles sin consentimiento explícito.',
      },
      {
        heading: '2. Uso de la información',
        body: 'Los datos recopilados se utilizan exclusivamente para gestionar cotizaciones, proyectos y comunicaciones relacionadas con nuestros servicios. No vendemos ni compartimos información personal con terceros.',
      },
      {
        heading: '3. Almacenamiento y seguridad',
        body: 'La información se almacena en servidores seguros con cifrado. Aplicamos medidas técnicas y organizativas para proteger tus datos contra acceso no autorizado, pérdida o alteración.',
      },
      {
        heading: '4. Tus derechos',
        body: 'Tienes derecho a acceder, corregir o solicitar la eliminación de tus datos personales en cualquier momento. Para ejercer estos derechos, contáctanos a contactowavdev@gmail.com.',
      },
      {
        heading: '5. Cookies',
        body: 'Este sitio utiliza cookies técnicas necesarias para el funcionamiento correcto. No utilizamos cookies de rastreo publicitario de terceros sin tu consentimiento.',
      },
      {
        heading: '6. Cambios a esta política',
        body: 'Podemos actualizar esta política ocasionalmente. Te notificaremos por correo electrónico si hay cambios significativos que afecten tus derechos.',
      },
    ],
  },
  'Política de Cookies': {
    titulo: 'Política de Cookies',
    secciones: [
      {
        heading: '¿Qué son las cookies?',
        body: 'Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo para recordar preferencias y mejorar tu experiencia de navegación.',
      },
      {
        heading: 'Cookies que utilizamos',
        body: 'Este sitio utiliza únicamente cookies técnicas esenciales para el correcto funcionamiento de la navegación (scroll, animaciones, estado del menú). No utilizamos cookies de seguimiento o publicidad.',
      },
      {
        heading: 'Cookies de terceros',
        body: 'Algunas funcionalidades pueden cargar recursos de terceros (fuentes de Google, íconos). Estos servicios pueden establecer sus propias cookies según sus políticas de privacidad.',
      },
      {
        heading: 'Control de cookies',
        body: 'Puedes configurar tu navegador para rechazar o eliminar cookies en cualquier momento. Ten en cuenta que desactivar cookies esenciales puede afectar el funcionamiento del sitio.',
      },
      {
        heading: 'Contacto',
        body: 'Si tienes preguntas sobre el uso de cookies en este sitio, escríbenos a contactowavdev@gmail.com y te responderemos a la brevedad.',
      },
    ],
  },
}

function LegalModal({ type, onClose }) {
  const content = LEGAL_CONTENT[type]
  if (!content) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(4,12,16,0.85)', backdropFilter: 'blur(8px)' }} />
        <motion.div
          className="relative w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col rounded-t-2xl sm:rounded-2xl"
          style={{ background: '#061A25', border: '1px solid rgba(27,188,216,0.2)' }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
            <h2 className="font-display font-bold text-white text-lg">{content.titulo}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-6 py-6 space-y-6 flex-1">
            {content.secciones.map((s, i) => (
              <div key={i}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: '#1BBCD8' }}>{s.heading}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
            <p className="text-slate-600 text-xs pt-4 border-t border-white/5">
              Última actualización: enero {new Date().getFullYear()} · WavDev, Guatemala
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════
//  FOOTER
// ═══════════════════════════════════════════════════════════════
function Footer() {
  const [legalModal, setLegalModal] = useState(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }

  const COLS = [
    {
      cat: 'Servicios',
      links: [
        { label: 'Desarrollo Web',    action: () => scrollTo('servicios') },
        { label: 'Apps Móviles',      action: () => scrollTo('servicios') },
        { label: 'Sistemas a Medida', action: () => scrollTo('servicios') },
        { label: 'Outsourcing TI',    action: () => scrollTo('servicios') },
      ],
    },
    {
      cat: 'Empresa',
      links: [
        { label: 'Nosotros',   action: () => scrollTo('historia') },
        { label: 'Portafolio', action: () => scrollTo('portafolio') },
        { label: 'Blog',       action: () => scrollTo('contacto'), badge: 'Próx.' },
        { label: 'Carreras',   action: () => scrollTo('contacto'), badge: 'Próx.' },
      ],
    },
    {
      cat: 'Legal',
      links: [
        { label: 'Términos de Servicio', action: () => setLegalModal('Términos de Servicio') },
        { label: 'Privacidad',           action: () => setLegalModal('Privacidad') },
        { label: 'Política de Cookies',  action: () => setLegalModal('Política de Cookies') },
      ],
    },
  ]

  return (
    <>
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}

      <footer className="border-t border-white/6" style={{ background: '#040C10' }}>
        {/* LinkedIn CTA */}
        <div className="py-16 text-center border-b border-white/5">
          <BlurIn className="text-slate-600 text-sm mb-6">
            ¿Buscas un socio tecnológico de confianza?
          </BlurIn>
          <motion.a
            href={LI_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all"
            style={{ background: '#0A66C2', boxShadow: '0 8px 40px rgba(10,102,194,0.4)' }}
          >
            <FaLinkedin size={22} />
            Conéctate con nosotros en LinkedIn
          </motion.a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/images/wavdev.webp" alt="WavDev" className="w-9 h-9 object-contain" />
                <span className="font-display font-bold text-lg text-white">WavDev</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Transformando ideas en soluciones digitales</p>
              <div className="space-y-1.5">
                <p className="text-slate-700 text-xs">contactowavdev@gmail.com</p>
                <p className="text-slate-700 text-xs">+502 3853 6836</p>
                <p className="text-slate-700 text-xs">Guatemala · Cobán · Jutiapa</p>
              </div>
            </div>

            {COLS.map(({ cat, links }) => (
              <div key={cat}>
                <h4 className="text-white font-semibold text-sm mb-4">{cat}</h4>
                <ul className="space-y-2.5">
                  {links.map(({ label, action, badge }) => (
                    <li key={label}>
                      <button
                        onClick={action}
                        className="flex items-center gap-2 text-slate-600 text-sm hover:text-slate-200 transition-colors text-left"
                      >
                        {label}
                        {badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: 'rgba(27,188,216,0.15)', color: '#1BBCD8', border: '1px solid rgba(27,188,216,0.3)' }}>
                            {badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-700 text-sm">© {new Date().getFullYear()} WavDev. Todos los derechos reservados.</p>
            <div className="flex gap-2.5">
              {[
                { href: WA_URL, Icon: FaWhatsapp, hoverColor: 'text-green-400' },
                { href: LI_URL, Icon: FaLinkedin, hoverColor: 'text-blue-400' },
              ].map(({ href, Icon, hoverColor }, i) => (
                <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center hover:bg-white/5 transition-all group">
                  <Icon className={`text-slate-600 group-hover:${hoverColor} transition-colors`} size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
//  BOTÓN FLOTANTE WHATSAPP
// ═══════════════════════════════════════════════════════════════
function FloatingWAButton() {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), 2200); return () => clearTimeout(t) }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WA_URL} target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full text-white font-semibold text-sm shadow-2xl"
          style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 0 28px rgba(37,211,102,0.55)' }}
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ['0 0 0px rgba(37,211,102,0)', '0 0 22px rgba(37,211,102,0.7)', '0 0 0px rgba(37,211,102,0)'] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <FaWhatsapp size={18} />
          <span className="hidden sm:inline relative">Cotizar ahora</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════
//  APP PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [activeSection, setActiveSection] = useState('inicio')

  return (
    <HelmetProvider>
      <SEOMeta />
      <ScrollProgressBar />
      <div className="min-h-screen font-body" style={{ background: '#040C10' }}>
        <Navbar />
        <SectionDots active={activeSection} />
        <main>
          <HeroChapter      onEnter={() => setActiveSection('inicio')} />
          <ServicesIntro />
          <ServicesChapter  onEnter={() => setActiveSection('servicios')} />
          <BridgeChapter />
          <PortfolioChapter onEnter={() => setActiveSection('portafolio')} />
          <ManifestoChapter onEnter={() => setActiveSection('historia')} />
          <PricingChapter   onEnter={() => setActiveSection('precios')} />
          <ContactChapter   onEnter={() => setActiveSection('contacto')} />
        </main>
        <Footer />
        <FloatingWAButton />
      </div>
    </HelmetProvider>
  )
}
