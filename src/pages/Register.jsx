import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../api/apiFetch'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Klientská validace - heslo se musí shodovat
    if (password !== passwordConfirm) {
      setError('Hesla se neshodují.')
      return
    }

    if (password.length < 6) {
      setError('Heslo musí mít alespoň 6 znaků.')
      return
    }

    setLoading(true)

    try {
      const response = await apiFetch('/Auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const message = errorData.errors?.[0] || 'Registrace se nezdařila.'
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
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Registrace</h1>

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
            placeholder="Heslo (min. 6 znaků)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-full border border-gray-600 px-4 py-2 outline-none focus:border-orange-700"
          />

          <input
            type="password"
            placeholder="Potvrď heslo"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
            {loading ? 'Registrace...' : 'Zaregistrovat se'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Už máš účet?{' '}
          <Link to="/login" className="text-orange-700 hover:underline">
            Přihlas se
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Register