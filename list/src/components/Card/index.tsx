import './styles.scss'
import { Todo } from '../../App'
 
type CardProps = { 
    todo: Todo;
    completeTodo: (id: number) => void
    deletarTodo: (id: number) => void
}

export default function Card({ todo, completeTodo, deletarTodo }: CardProps) {

    const handleCompleteTodo = () => {
        completeTodo(todo.id)
    }

    const handleDelete = () => {
        deletarTodo(todo.id)
    }

    return (
        <div className={`card ${todo.completed ? 'done' : ''}`}>
            <div className='check'>
                <input type='checkbox' onClick={handleCompleteTodo}/>
                <h2>{todo.title[0].toUpperCase() + todo.title.substring(1)}</h2>
            </div>

            <div className="card-button">
                <button onClick={handleDelete}>Deletar</button>
            </div>
        </div>
    )
}