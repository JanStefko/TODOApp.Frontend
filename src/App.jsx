import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { useEffect, useState } from 'react'

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${apiBaseUrl}/Todos`)

      if (!response.ok) {
        throw new Error(`HTTP chyba: ${response.status}`)
      }

      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError('Nepodařilo se načíst úkoly z API.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!newTodo.trim()) {
      return
    }

    try {
      setError('')

      const response = await fetch(`${apiBaseUrl}/Todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo,
          isCompleted: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP chyba: ${response.status}`)
      }

      const createdTodo = await response.json()
      setTodos([...todos, createdTodo])
      setNewTodo('')
    } catch (err) {
      console.error(err)
      setError('Nepodařilo se vytvořit nový úkol.')
    }
  }

  async function handleToggleTodo(todoToUpdate) {
    const updatedTodo = {
      title: todoToUpdate.title,
      isCompleted: !todoToUpdate.isCompleted,
    }

    try {
      setError('')

      const response = await fetch(`${apiBaseUrl}/Todos/${todoToUpdate.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTodo),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP chyba: ${response.status}`)
      }

      setTodos(
        todos.map((todo) =>
          todo.id === todoToUpdate.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        )
      )
    } catch (err) {
      console.error(err)
      setError('Nepodařilo se aktualizovat úkol.')
    }
  }

  async function handleDeleteTodo(id) {
    try {
      setError('')

      const response = await fetch(`${apiBaseUrl}/Todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP chyba: ${response.status}`)
      }

      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error(err)
      setError('Nepodařilo se smazat úkol.')
    }
  }

return (
  <main className="min-h-screen bg-linear-to-tr from-indigo-900 via-gray-900 to-orange-600 pt-24 font-mono font-bold">
    <div className="mx-auto max-w-xl rounded-4xl bg-white p-6  border-zinc-800 border-2">
      
      <Header todos={todos} />

      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        onSubmit={handleSubmit}
      />

      {loading && (
        <p className="mt-6 text-slate-500">Načítám úkoly...</p>
      )}

      {error && (
        <p className="mt-6 text-red-600">{error}</p>
      )}

      {!loading && !error && (
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      )}
    </div>
  </main>
)
}

export default App