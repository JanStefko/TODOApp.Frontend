import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../api/apiFetch'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await apiFetch('/Auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const message = errorData.errors?.[0] || 'Přihlášení se nezdařilo.'
        throw new Error(message)
      }

      const data = await response.json()
      login(data.token, data.email, data.expiresAt)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-tr from-indigo-900 via-gray-900 to-orange-600 pt-24 font-mono font-bold">
      <div className="mx-auto max-w-md rounded-4xl bg-white p-8 border-zinc-800 border-2">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Přihlášení</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-full border border-gray-600 px-4 py-2 outline-none focus:border-orange-700"
          />

          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-full border border-gray-600 px-4 py-2 outline-none focus:border-orange-700"
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gray-800 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? 'Přihlašování...' : 'Přihlásit se'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Nemáš účet?{' '}
          <Link to="/register" className="text-orange-700 hover:underline">
            Zaregistruj se
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Login