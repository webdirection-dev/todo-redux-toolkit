const InputField = (props) => {
    const {
        isText = '',
        setText,
        onAddTodo = Function.prototype
    } = props

    return(
        <label>
            <input
                type="text"
                value={isText}
                onChange={(event) => setText(event.target.value)}
            />

            <button
                className='12'
                onClick={onAddTodo}
            >
                Add Todo
            </button>
        </label>
    )
}

export default InputField