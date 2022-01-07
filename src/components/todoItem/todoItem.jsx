const TodoItem = (props) => {
    const {
        id = '',
        text = '',
        compiled = false,

        onToggleTodoCompiled = Function.prototype,
        onRemoveTodo = Function.prototype,
    } = props

    return(
        <li>
            <input
                type="checkbox"
                checked={compiled}
                onChange={() => onToggleTodoCompiled(id)}
            />

            <span>{text}</span>

            <span
                className='delete'
                onClick={() => onRemoveTodo(id)}
            > &times;</span>
        </li>
    )
}

export default TodoItem