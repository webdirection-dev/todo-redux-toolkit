import {useDispatch} from "react-redux";
import {removeTodo, toggleTodoComplete, deleteTodo, toggleStatus} from "../../store/todoSlice";

const TodoItem = (props) => {
    const {
        id = '',
        title = '',
        compiled = false,
    } = props

    const dispatch = useDispatch()

    return(
        <li>
            <input
                type="checkbox"
                checked={compiled}
                onChange={() => dispatch(toggleStatus(id))}
                // onChange={() => dispatch(toggleTodoComplete({id}))}
            />

            <span>{title}</span>

            <span
                className='delete'
                onClick={() => {
                    // dispatch(removeTodo({id: id}))
                    dispatch(deleteTodo(id))
                }}
            > &times;</span>
        </li>
    )
}

export default TodoItem