import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authApi, clearStoredSession, getTokens } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'))

  const clearSession = useCallback(() => {
    clearStoredSession()
    setUser(null)
  }, [])

  useEffect(() => {
    window.addEventListener('auth:expired', clearSession)
    return () => window.removeEventListener('auth:expired', clearSession)
  }, [clearSession])

  const saveSession = useCallback((result, fallbackUser) => {
    const { accessToken, refreshToken } = getTokens(result)
    const nextUser = result.user || result.data?.user || fallbackUser
    if (!accessToken) throw new Error('The login response did not include an access token.')
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('token', accessToken)
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('user', JSON.stringify(nextUser))
    setUser(nextUser)
  }, [])

  const login = useCallback(async (credentials) => {
    saveSession(await authApi.login(credentials), { email: credentials.email })
  }, [saveSession])

  const register = useCallback(async (details) => {
    saveSession(await authApi.register(details), { name: details.name, email: details.email })
  }, [saveSession])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      clearSession()
    }
  }, [clearSession])

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
