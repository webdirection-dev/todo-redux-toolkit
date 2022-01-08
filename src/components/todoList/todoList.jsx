import {useSelector} from "react-redux" // доступ к State за значениями

import TodoItem from "../todoItem"

const TodoList = () => {
    // useSelector принимает функцию. Функция принимает Store он же State
    const reducerTodos = useSelector(state => state.reducerTodos.todos) // из /store/index.js

    return(
        <ul>
            {
                reducerTodos.map(item =>
                    <TodoItem
                        key={item.id}
                        {...item}
                    />
                )
            }
        </ul>
    )
}

export default TodoList