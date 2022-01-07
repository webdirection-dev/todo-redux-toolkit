
import {useState} from "react";
import './App.css';

import TodoList from "../todoList";
import InputField from "../inputField";

function App() {
    const [isTodos, setToDos] = useState([])
    const [isText, setText] = useState('')

    const onAddTodo = () => {
        if (isText.trim().length) {
            setToDos([
                ...isTodos,
                {
                    id: new Date().toISOString(),
                    text: isText,
                    compiled: false,
                }
            ])

            setText('')
        }
    }

    const onRemoveTodo = (id) => {
        setToDos(isTodos.filter(item => id !== item.id))
    }

    const onToggleTodoCompiled = (id) => {
        setToDos(isTodos.map(item => {
            if (id !== item.id) return item
            return {
                ...item,
                compiled: !item.compiled
            }
        }))
    }

    return (
        <View
            isTodos={isTodos}
            isText={isText}
            setText={setText}

            onAddTodo={onAddTodo}
            onRemoveTodo={onRemoveTodo}
            onToggleTodoCompiled={onToggleTodoCompiled}
        />
    )
}

const View = (props) => {
    const {
        isTodos,
        isText,
        setText,

        onAddTodo,
        onRemoveTodo,
        onToggleTodoCompiled,
    } = props

    return(
        <div className="App">
            <InputField
                isText={isText}
                setText={setText}
                onAddTodo={onAddTodo}
            />

            <TodoList
                isTodos={isTodos}
                onRemoveTodo={onRemoveTodo}
                onToggleTodoCompiled={onToggleTodoCompiled}
            />
        </div>
    )
}

export default App;