const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getAccessToken = () => localStorage.getItem('accessToken') || localStorage.getItem('token')
const getRefreshToken = () => localStorage.getItem('refreshToken')

export function clearStoredSession() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

function endExpiredSession() {
  clearStoredSession()
  window.dispatchEvent(new window.Event('auth:expired'))
}

export function getTokens(payload = {}) {
  const data = payload.data || payload.result || payload
  return {
    accessToken: data.accessToken || data.access_token || data.token || payload.accessToken || payload.access_token || payload.token,
    refreshToken: data.refreshToken || data.refresh_token || payload.refreshToken || payload.refresh_token,
  }
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return null
  const response = await fetch(`${API_URL}/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken }) })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) return null
  const tokens = getTokens(body)
  if (!tokens.accessToken) return null
  localStorage.setItem('accessToken', tokens.accessToken)
  localStorage.setItem('token', tokens.accessToken)
  if (tokens.refreshToken) localStorage.setItem('refreshToken', tokens.refreshToken)
  return tokens.accessToken
}

export async function request(path, options = {}) {
  const { skipAuthRefresh = false, requiresAuth = !skipAuthRefresh, ...fetchOptions } = options
  const makeRequest = (token) => fetch(`${API_URL}${path}`, { ...fetchOptions, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...fetchOptions.headers } })
  let response = await makeRequest(requiresAuth ? getAccessToken() : null)
  if (response.status === 401 && requiresAuth && !skipAuthRefresh) {
    const token = await refreshAccessToken()
    if (token) response = await makeRequest(token)
    else endExpiredSession()
  }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.message || body.error || 'Something went wrong. Please try again.')
  return body
}

export const authApi = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials), skipAuthRefresh: true }),
  register: (details) => request('/auth/register', { method: 'POST', body: JSON.stringify(details), skipAuthRefresh: true }),
  logout: () => {
    const refreshToken = getRefreshToken()
    return refreshToken
      ? request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken }), skipAuthRefresh: true })
      : Promise.resolve()
  },
}
export const projectApi = {
  list: () => request('/projects'),
  get: (id) => request(`/projects/${id}`),
  create: (project) => request('/projects', { method: 'POST', body: JSON.stringify(project) }),
  update: (id, project) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) }),
  remove: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
}
export const taskApi = {
  list: (projectId) => request(`/projects/${projectId}/tasks`),
  create: (projectId, task) => request(`/projects/${projectId}/tasks`, { method: 'POST', body: JSON.stringify(task) }),
  update: (id, task) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) }),
  updateStatus: (id, status) => request(`/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  remove: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
}
