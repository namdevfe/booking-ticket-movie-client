import { HTTP_STATUS_CODES } from '@/constants/http-status-code'

type FetchOptions = RequestInit & {
  baseUrl?: string
}

// Check client
export const isClient = typeof window !== 'undefined'

// Fetch wrapper
const request = async <Response>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  options: FetchOptions
) => {
  // Build Url
  const baseUrl =
    options?.baseUrl === '' ? options.baseUrl : process.env.NEXT_PUBLIC_API_ROOT

  // Buid body
  const body = options.body ? JSON.stringify(options.body) : undefined

  // Get accessToken from client
  const accessToken = isClient
    ? JSON.parse(localStorage.getItem('accessToken') as string)
    : null

  // Build headers
  const baseHeaders = {
    ...options.headers,
    'Content-Type': 'application/json'
  } as any

  // Auto assign accessToken when request on client-side
  if (isClient && accessToken) {
    baseHeaders.Authorization = `Bearer ${accessToken}`
  }

  // /auth/login || auth/login
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders
    },
    body,
    method
  })

  const data = (await res.json()) as Response

  if (!res.ok) {
    if (res.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
      // Token expired on client-side
      if (isClient) {
        // Handle logout
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            ...baseHeaders
          }
        })

        // Clear toke on localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        // Redirect to login page
        window.location.href = '/login'
      }
    }
    throw data
  }

  return data
}

const http = {
  get: <Response>(url: string, options?: Omit<FetchOptions, 'body'>) => {
    return request<Response>(url, 'GET', { ...options })
  },
  post: <Response>(
    url: string,
    body: any,
    options?: Omit<FetchOptions, 'body'>
  ) => {
    return request<Response>(url, 'POST', { ...options, body })
  },
  put: <Response>(
    url: string,
    body: any,
    options?: Omit<FetchOptions, 'body'>
  ) => {
    return request<Response>(url, 'PUT', { ...options, body })
  },
  patch: <Response>(
    url: string,
    body: any,
    options?: Omit<FetchOptions, 'body'>
  ) => {
    return request<Response>(url, 'PATCH', { ...options, body })
  },
  delete: <Response>(
    url: string,
    body: any,
    options?: Omit<FetchOptions, 'body'>
  ) => {
    return request<Response>(url, 'DELETE', { ...options, body })
  }
}

export default http
