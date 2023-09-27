import React from 'react';
import './tasksCard.css';
import { useTasks } from '../context/TasksContext';
import { Link } from "react-router-dom";

const TasksCard = ({ task }) => {

    const { deleteTasks } = useTasks();

    return (
        <div className='tasks'>
            <div className='tasks-container'>
                <div className='tasks-card'>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <p className='card-date'>{new Date(task.date).toLocaleDateString()}</p>
                    <div className='card-edit'>
                        <button className='btn-delete' onClick={() => deleteTasks(task._id)}>Eliminar</button>
                        <Link to={`/tasks/${task._id}`}><button className='btn-edit'>Editar</button></Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default TasksCard;