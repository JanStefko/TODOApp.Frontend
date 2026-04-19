import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="mt-8 space-y-4">
{todos
  .slice()
  .sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0
    return a.isCompleted ? 1 : -1
  })
  .map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onToggle={onToggle}
      onDelete={onDelete}
    />
))}
    </ul>
  )
}

export default TodoList