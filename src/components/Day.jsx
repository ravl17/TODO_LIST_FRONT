// src/components/Day.js
import React, { useState, useEffect } from 'react';
import { Task } from './Task';
import './Day.css'
function Day({dayOfWeek,timestamp}) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // fetch('/api/tasks')
        fetch('http://localhost:8080/api/tasks/date?dateTimestamp='+timestamp)
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

        return (
          <div className='day-container'>
            <h3>{dayOfWeek}</h3>
                {tasks.map(task => (
                    // <li key={task.id}>{task.name}</li>
                    <Task key={task.id}
                    task={task}></Task>
                ))}
          </div>
        );
}

export default Day;
