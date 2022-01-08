import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    // 1м параметром назовем action:
    'reducerTodos/fetchTodos',
    // 2м параметром будет асинхронная функция, которая принимает до 3х параметров
    // 1й параметр асинхронной функции принимает X, который передается через dispatch(todos(X)) или _ т.е пустой параметр
    // 2й параметр принимает {} с настройками:
    // a) rejectWithValue - значение ошибки, которую мы передадим в fetchTodos.rejected
    // b) dispatch
    // c) getState - состояние всего приложения
    async function(_, {rejectWithValue}) {
        try {
            const response  = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

            if (!response.ok) throw new Error('Server Error!')

            const data = await response.json()

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Удалить таску с сервера
export const deleteTodo = createAsyncThunk(
    'reducerTodos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Can\'t delete task. Server error.')

            dispatch(removeTodo({id}))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Меняем статус
export const toggleStatus = createAsyncThunk(
    'reducerTodos/toggleStatus',
    async function(id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().reducerTodos.todos.find(item => item.id === id)

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    complited: !todo.complited
                })
            })

            if (!response.ok) throw new Error('Can\'t toggle status. Server error.')

            dispatch(toggleTodoComplete({id}))
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'reducerTodos/addNewTodo',
    async function(isText, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                "userId": 1,
                "title": isText,
                "completed": false
            }

            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            })

            if (!response.ok) throw new Error('Can\'t add task. Server error.')

            const data = await response.json()

            dispatch(addTodo(data))
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const todoSlice = createSlice(
    {
        name: 'todos',

        initialState: {
            todos: [],
            status: null,
            error: null,
        },

        reducers: {
            addTodo(state, action) {
                state.todos.push(action.payload)

                // state.todos.push({
                //     id: new Date().toISOString(),
                //     title: action.payload.isText,
                //     compiled: false,
                // })
            },

            removeTodo(state, action) {
                state.todos = state.todos.filter(item => action.payload.id !== item.id)
            },

            toggleTodoComplete(state, action) {
                // Решение 1
                const toggleTodo = state.todos.find(item => item.id === action.payload.id)
                toggleTodo.compiled = !toggleTodo.compiled

                // // Решение 2
                // state.todos = state.todos.map(item => {
                //     if (action.payload.id !== item.id) return item
                //     return {
                //         ...item,
                //         compiled: !item.compiled
                //     }
                // })
            },
        },

        // fetchTodos дает нам три метода жизненых цикла состояния
        // 1 pending - пока идет загрузка данных / до return в функции fetchTodos
        // 2 fulfilled - данные успешно получены / после return в функции fetchTodos
        // 3 rejected - данные обработаны с ошибкой
        extraReducers: {
            [fetchTodos.pending]: (state, action) => {
                state.status = 'loading'
                state.error = null
            },

            [fetchTodos.fulfilled]: (state, action) => {
                state.status = 'resolved'
                state.error = null

                state.todos = action.payload
            },

            [fetchTodos.rejected]: setError,
            [deleteTodo.rejected]: setError,
            [toggleStatus.rejected]: setError,
        },
    }
)

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions

export default todoSlice.reducer