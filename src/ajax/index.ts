function ensureLeadingSlash(param: string) {
  if (!param.startsWith('/')) {
    return '/' + param
  }

  return param
}

export default function fetchApi(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  if (typeof input === 'string' && !input.startsWith('https://')) {
    return fetch(import.meta.env.VITE_API_URL + ensureLeadingSlash(input), init)
  }

  return fetch(input, init)
}
