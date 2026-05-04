import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl font-mono">Načítání...</p>
      </div>
    )
  }

  return (
    <Routes>
      {/* Veřejné stránky - pokud je uživatel přihlášený, redirect na hlavní */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Chráněné stránky */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Todos />
          </ProtectedRoute>
        }
      />

      {/* Cokoliv jiného - redirect na hlavní */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App