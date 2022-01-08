import {useState, useEffect} from "react";
import './App.css';

import {useDispatch, useSelector} from "react-redux";
import {addTodo, fetchTodos, addNewTodo} from "../../store/todoSlice";

import TodoList from "../todoList";
import InputField from "../inputField";

function App() {
    const [isText, setText] = useState('')
    const {status, error} = useSelector(state => state.reducerTodos)

    const dispatch = useDispatch()
    const addTask = () => {
        dispatch(addNewTodo(isText))
        // dispatch(addTodo({isText: isText}))
        setText('')
    }

    // componentDidMount
    //работа с асинчронным fetchTodos
    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <View
            isText={isText}
            setText={setText}

            addTask={addTask}

            status={status}
            error={error}
        />
    )
}

const View = (props) => {
    const {
        isText,
        setText,

        addTask,
        status,
        error,
    } = props

    return(
        <div className="App">
            <InputField
                isText={isText}
                setText={setText}
                addTask={addTask}
            />

            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occurred: {error}</h2>}

            <TodoList />
        </div>
    )
}

export default App;