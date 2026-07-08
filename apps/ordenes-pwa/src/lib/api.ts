import { useAuthStore } from './auth-store'

type RuntimeConfigWindow = Window & {
  __MABE_CONFIG__?: {
    apiUrl?: string
  }
}

const runtimeConfig = typeof window === 'undefined' ? undefined : (window as RuntimeConfigWindow).__MABE_CONFIG__
const rawApiUrl = runtimeConfig?.apiUrl ?? import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
const API_URL = rawApiUrl.replace(/\/$/, '')

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().accessToken
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    })
  } catch {
    throw new Error(`No se pudo conectar con el API real en ${API_URL}. Verifica que el backend este corriendo.`)
  }

  if (!response.ok) {
    if (response.status === 401) {
      useAuthStore.getState().logout()
      if (!location.pathname.startsWith('/login') && !location.pathname.startsWith('/public/')) {
        location.href = '/login'
      }
    }
    throw new Error(await response.text())
  }

  return response.json()
}

export { API_URL }
