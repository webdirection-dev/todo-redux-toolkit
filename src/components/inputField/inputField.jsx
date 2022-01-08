const InputField = (props) => {
    const {
        isText = '',
        setText,
        addTask = Function.prototype
    } = props

    return(
        <label>
            <input
                type="text"
                value={isText}
                onChange={(event) => setText(event.target.value)}
            />

            <button
                onClick={addTask}
            >
                Add Todo
            </button>
        </label>
    )
}

export default InputField