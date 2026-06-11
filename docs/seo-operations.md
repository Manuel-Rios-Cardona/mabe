# Operación SEO de WavDev

## Configuración inicial

1. Verificar `wavdev.lat` como propiedad de dominio en Google Search Console mediante DNS.
2. Enviar `https://wavdev.lat/sitemap-index.xml` y solicitar indexación de páginas prioritarias.
3. Importar la propiedad en Bing Webmaster Tools.
4. Configurar en Railway:
   - `PUBLIC_GA_MEASUREMENT_ID`
   - `PUBLIC_GOOGLE_SITE_VERIFICATION`, si se utiliza verificación HTML.
   - `PUBLIC_BING_SITE_VERIFICATION`, si se utiliza verificación HTML.
5. Confirmar en GA4 DebugView los eventos `generate_lead`, `form_submit`, `quote_click`, `whatsapp_click`, `phone_click`, `email_click`, `calculator_start`, `calculator_result`, `calculator_share`, `file_download` y `video_play`.

## Revisión semanal

1. Exportar de Search Console consultas y páginas de los últimos 28 días.
2. Separar marca y consultas no relacionadas con WavDev.
3. Identificar posiciones 8-20, CTR bajo y preguntas sin respuesta.
4. Relacionar páginas orgánicas con leads y eventos de GA4.
5. Registrar cambios de título, contenido y enlaces con fecha.

## Tablero mensual

El tablero de Looker Studio debe combinar Search Console y GA4:

- URLs indexadas y válidas.
- Clics e impresiones sin marca.
- CTR y posición por página.
- Consultas Top 20, Top 10 y Top 3.
- Leads por formulario, WhatsApp, teléfono y correo.
- Uso de calculadora, descargas y videos.
- Tasa de conversión orgánica.
- LCP, INP y CLS desde Search Console y PageSpeed Insights.

No comparar meses hasta guardar una línea base completa.
Excluir de las consultas sin marca las variaciones `wavdev`, `wav dev` y el dominio.

## Google Business Profile

- Mantener WavDev como negocio de área de servicio.
- No publicar una dirección que no atienda clientes durante el horario indicado.
- Crear un servicio por URL comercial y usar UTM:
  `?utm_source=google_business_profile&utm_medium=organic&utm_campaign=service_name`.
- Publicar una actualización semanal.
- Solicitar reseñas después de un hito verificable sin dictar palabras.
- Responder cada reseña describiendo el servicio real.
- Añadir fotografías reales; no usar imágenes generadas como evidencia del equipo.

## Casos y evidencia

Antes de cambiar `evidenceStatus` a `verified`, conservar autorización escrita para:

- Nombre y logo.
- Capturas y datos visibles.
- Nombre y cargo del testimonio.
- Métricas, período y método de cálculo.
- Enlace desde el sitio del cliente cuando sea posible.

## Outreach

Objetivo: dos dominios relevantes al mes.

- Solicitar al cliente enlazar su caso autorizado.
- Proponer guías o charlas a cámaras, universidades y comunidades.
- Contactar proveedores y aliados cuando la integración esté documentada.
- Registrar dominio, contacto, propuesta, fecha y resultado.
- Rechazar compra de enlaces, PBN, directorios automáticos y artículos duplicados.

## Producción editorial

Frecuencia sostenible: dos guías y un video al mes.

Cada pieza necesita:

- Consulta o problema demostrado.
- Autor identificable.
- Experiencia, ejemplo o análisis propio.
- Fuentes primarias cuando corresponda.
- Enlaces hacia servicio, caso y herramienta.
- Revisión técnica y fecha de cambio real.

El radar de tendencias es `noindex, follow`. No se convierte automáticamente en artículos.

## Video

Publicar una página indexable solo cuando exista un video visible. Incluir:

- Título y resumen.
- Transcripción revisada.
- Capítulos.
- Miniatura propia.
- Fecha, duración y autor.
- `VideoObject` que coincida con lo visible.
- Enlaces hacia YouTube, servicio, caso y guía.
