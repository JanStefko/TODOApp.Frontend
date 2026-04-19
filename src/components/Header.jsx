function Header({todos}) {
    const totalTodos = todos.length
    const completedTodos = todos.filter((todo) => todo.isCompleted).length
    const remainingTodos = totalTodos - completedTodos

      return (
    <header>
        <h1 className="text-4xl font-bold text-slate-800 mb-2 text-center py-3">Seznam úkolů</h1>
        <div className="flex gap-10 text-sm text-zinc-500 justify-center pb-1">
            <div>
                <span className="font-semibold text-zinc-800 p-0.5">{totalTodos}</span> úkolů
            </div>
            <div>
                <span className="font-semibold text-green-600 p-0.5">{completedTodos}</span> dokončeno
            </div>
            <div>
                <span className="font-semibold text-amber-700 p-0.5">{remainingTodos}</span> zbývá
            </div>
        </div>
    </header>
  )
}

export default Header