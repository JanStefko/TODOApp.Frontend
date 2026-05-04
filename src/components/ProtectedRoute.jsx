import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  // Zatímco se ověřuje token z localStorage, zobraz loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl font-mono">Načítání...</p>
      </div>
    )
  }

  // Pokud uživatel není přihlášený, přesměruj na login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Jinak vykresli obsah
  return children
}

export default ProtectedRoute