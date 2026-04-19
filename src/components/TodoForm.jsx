function TodoForm({ newTodo, setNewTodo, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mt-6 flex gap-3 mx-0.5">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Napiš nový úkol..."
        className="flex-1 rounded-full border border-gray-600 px-4 py-2 outline-none focus:border-orange-700"
      />
      <button
        type="submit"
        className="rounded-full bg-gray-800 px-4 py-2 font-medium text-white hover:bg-slate-700"
      >
        Přidat
      </button>
    </form>
  )
}
export default TodoForm
