import TodoItem from "../todoItem";

const TodoList = (props) => {
    const {
        isTodos,
        onRemoveTodo,
        onToggleTodoCompiled,
    } = props

    return(
        <ul>
            {
                isTodos.map(item =>
                    <TodoItem
                        key={item.id}
                        onRemoveTodo={onRemoveTodo}
                        onToggleTodoCompiled={onToggleTodoCompiled}
                        {...item}
                    />
                )
            }
        </ul>
    )
}

export default TodoList