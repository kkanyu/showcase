import React, {useState} from "react"
import ToDoList from "./ToDoList"

function App() {
    const [todos, setTodos] = useState(['Todo 1', 'Todo 2'])
    return (
        <>
        <ToDoList todos={todos} />
        <input type="text" />
        <button>Add Item</button>
        <button>Clear Items</button>
        <div>0 left to do</div>
        </>
    )
}

export default App;