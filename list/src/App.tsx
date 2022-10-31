import { ChangeEvent, useState, useEffect } from 'react'
import Card from './components/Card'
import './App.scss'

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {

  const [ todoInput, setTodoInput ] = useState('')
  const [ todos, setTodos ] = useState<Todo[]>(() => {
    const storedTodo = localStorage.getItem('@codersList:todos')

    if(storedTodo) {
      return JSON.parse(storedTodo)
    }

    return []
  });


  useEffect(() => {
    localStorage.setItem('@codersList:todos', JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = () => {
    setTodos([...todos, { id: Math.random(), title: todoInput, completed: false }])
    setTodoInput('')
  }

  const completeTodo = (id: number) => {
    setTodos((previousTodos) => previousTodos.map((todo) => todo.id != id ? todo : { ...todo, completed: !todo.completed }))
  }

  const deleteTodo = (id: number) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id != id))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value)
  }

  return (
    <div className="App">
      <h1>Adicione Itens na lista</h1>
      <div className='add-todo'>
        <input placeholder='Fazer café'
        value={todoInput}
        onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Adicionar</button>
      </div>
      {
        todos.map((todo) => (
          <Card deletarTodo={deleteTodo} completeTodo={completeTodo} key={todo.id} todo={todo} />
        ))
      }
    </div>
  )
}

export default App
