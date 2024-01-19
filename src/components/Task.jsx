import './Task.css'
import { useState } from 'react';
export function Task({ task }) {
    const [isDone, setIsDone] = useState(task.is_done);
    const state = isDone ? '✓' : '✕';
    const stateClass = isDone ? 'task_state_done' : 'task_state_wip';
    const date= new Date(task.date).toLocaleString();
    const handleClick = () => {
        // Toggle the isDone state when the div is clicked
        setIsDone(!isDone);
      
        // Call the server endpoint to update the is_done state
        const apiUrl = `http://localhost:8080/api/tasks/is_done?taskId=${task.id}&is_done=${!isDone}`;
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        fetch(apiUrl, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          })
          .catch(error => {
            console.error('Error updating is_done state:', error);
            // You can handle errors here
          });
      };
    return (
        <div className="card_task" key={task.id}>

            <h3 className='card_title'>{task.name}</h3>
            <div className={stateClass} onClick={handleClick}>{state}</div>
            <div className="card_date">
                {date}
            </div>

        </div>
    )
}