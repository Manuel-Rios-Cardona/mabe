import type { APIRoute } from 'astro'
import { getTechnologyTrends } from '../../lib/trends'

export const GET: APIRoute = async () => {
  const data = await getTechnologyTrends()

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=21600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'noindex',
    },
  })
}
