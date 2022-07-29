import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([])

  function getCountFromServer () {
    fetch('http://localhost:3000/count')
      .then(resp => resp.json())
      .then(data => setCount(data.value))
  }

  function getTodosFromServer () {
    fetch('http://localhost:3000/todos')
      .then(resp => resp.json())
      .then(todos => setTodos(todos))
  }

  useEffect(() => {
    getCountFromServer()
    getTodosFromServer()
  }, [])

  function increaseCounter () {
    setCount(count + 1)

    fetch('http://localhost:3000/count', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: count + 1 })
    })
  }

  function decreaseCounter () {
    setCount(count - 1)

    fetch('http://localhost:3000/count', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: count - 1 })
    })
  }

  function createTodo (title: string) {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, completed: false })
    })
      .then(resp => resp.json())
      .then(newTodo => {
        // let todosCopy = structuredClone(todos)
        // todosCopy.push(newTodo)
        // setTodos(todosCopy)
        setTodos([...todos, newTodo])
      })
  }

  return (
    <div className='App'>
      <h1>{count}</h1>
      <button onClick={() => decreaseCounter()}>-</button>
      <button onClick={() => increaseCounter()}>+</button>

      <h2>Todos</h2>

      <form onSubmit={(event) => {
        event.preventDefault()
        createTodo(event.target.title.value)
      }}>
        <input type='text' name='title' placeholder='todo title...' />
        <button>ADD TODO</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
