import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)

  // Při startu aplikace zkusíme načíst token z localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedEmail = localStorage.getItem('email')
    const storedExpiresAt = localStorage.getItem('expiresAt')

    if (storedToken && storedExpiresAt) {
      // Zkontroluj, jestli token nevypršel
      if (new Date(storedExpiresAt) > new Date()) {
        setToken(storedToken)
        setEmail(storedEmail)
      } else {
        // Token vypršel - vyčisti localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('expiresAt')
      }
    }

    setLoading(false)
  }, [])

  function login(token, email, expiresAt) {
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    localStorage.setItem('expiresAt', expiresAt)
    setToken(token)
    setEmail(email)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('expiresAt')
    setToken(null)
    setEmail(null)
  }

  const value = {
    token,
    email,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook pro snadné použití kontextu
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth musí být použit uvnitř AuthProvider')
  }
  return context
}