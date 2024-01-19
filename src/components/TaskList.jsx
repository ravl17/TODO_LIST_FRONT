// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { Task } from './Task';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // fetch('/api/tasks')
        fetch('http://localhost:8080/api/tasks')
            .then(response => response.json())
            .then(data => {
                setTasks(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    // <li key={task.id}>{task.name}</li>
                    <Task key={task.id}
                    task={task}></Task>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
