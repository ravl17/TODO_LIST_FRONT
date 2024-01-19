// src/components/Day.js
import './Day.css'
import * as Constants from './constants.js';
import React, { useState, useEffect } from 'react';
import { Task } from './Task';
function Day({dayOfWeek,timestamp}) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // fetch('/api/tasks')
        fetch(Constants.API_ENDPOINT+'/tasks/date?dateTimestamp='+timestamp)
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
