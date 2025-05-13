type FetchOptions = RequestInit & {
  baseUrl?: string
}

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

  // Build headers
  const baseHeaders = {
    'Content-Type': 'application/json',
    ...options.headers
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

  const data = await res.json()

  if (!res.ok) {
    throw data
  }

  return data as Response
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
