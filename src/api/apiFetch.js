const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    ...options,
    headers,
  })

  // Pokud token vypršel (401), vyčisti localStorage a přesměruj na login
  if (response.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('expiresAt')
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }

  return response
}