function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between py-3">
      <label className="flex items-center gap-6 px-5">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo)}
          className="h-5 w-5 accent-gray-600 cursor-pointer"
        />
        <span
          className={
            todo.isCompleted
              ? 'text-gray-400 line-through font-light'
              : 'text-gray-800'
          }
        >
          {todo.title}
        </span>
      </label>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="rounded-full px-4 py-2 text-gray-600 hover:text-orange-900 hover:bg-orange-600"
      >
        Smazat
      </button>
    </li>
  )
}

export default TodoItem