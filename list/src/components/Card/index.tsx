import './styles.scss'
import { Todo } from '../../App'
import { useState } from 'react'
 
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
            <h2>{todo.title}</h2>

            <div className="card-button">
                <button onClick={handleCompleteTodo}>{todo.completed == true ? 'Retomar' : 'Completar'}</button>
                <button onClick={handleDelete}>Deletar</button>
            </div>
        </div>
    )
}