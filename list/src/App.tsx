import { ChangeEvent, useState, useEffect } from 'react'
import Card from './Components/Card/Index';
import './App.scss'

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {

  const [todoInput, setTodoInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodo = localStorage.getItem('@codersList:todos')

    if (storedTodo) {
      return JSON.parse(storedTodo)
    }

    return []
  });
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    localStorage.setItem('@codersList:todos', JSON.stringify(todos))
  }, [todos])

  const handleSetTheme = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked)
    console.log(theme)
  }

  const handleAddTodo = () => {
    if (!todoInput) {
      setMessage('Ops!, digite algo')
      setTimeout(() => {
        setMessage('')
      }, 2000)
      return
    }
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
    <section className={`section ${theme ? 'section-light' : 'section-dark'}`}>
      <div>
        <label className='switch'>
          <div className='switch-wrapper'>
            <input type='checkbox' checked={theme} onChange={handleSetTheme} />
            <span className='switch-button'></span>
          </div>
        </label>
      </div>
      <div className='content-list'>
        <h1>Adicione Itens na lista</h1>
        <div className='add-todo'>
          <input placeholder='Exemplo: Ir no mercado'
            value={todoInput}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTodo}>Adicionar</button>
        </div>
        <div className='list'>
          {
            todos.map((todo) => (
              <Card deletarTodo={deleteTodo} completeTodo={completeTodo} key={todo.id} todo={todo} />
            ))
          }
        </div>
        {message.length ? <span className='message'>
          {message}
        </span> : ''}
      </div>
    </section>
  )
}

export default App
