import './Task.css'
import * as Constants from './constants.js';
import { useState } from 'react';
export function Task({ task }) {
  const [isDone, setIsDone] = useState(task.is_done);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDate, setEditedDate] = useState(task.date);

  const state = isDone ? '✓' : '✕';
  const stateClass = isDone ? 'task-state-done' : 'task-state-wip';
  const date = new Date(task.date).toLocaleString();


  const handleClick = () => {
    // Toggle the isDone state when the div is clicked
    setIsDone(!isDone);

    // Call the server endpoint to update the is_done state
    const apiUrl = Constants.API_ENDPOINT + `/tasks/is_done?taskId=${task.id}&is_done=${!isDone}`;
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
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    const editedTask = {
      // replace with the actual properties of your Task object
      name: editedName,
      date: editedDate,
      user_id: 1,
      is_done:isDone
      // ... other properties
    };
    // Call the server endpoint to update the task name and date
    const apiUrl = Constants.API_ENDPOINT + `/tasks/update/${task.id}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedTask),
    };

    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating task:', error);
        // You can handle errors here
      });
  };

  const handleCancelClick = () => {
    // Cancel editing and revert to the original task name and date
    setIsEditing(false);
    setEditedName(task.name);
    setEditedDate(task.date);
  };
  return (
    <div className="card-task" key={task.id}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="datetime-local"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <h3 className='card-title'>{task.name}</h3>
          <div className={stateClass} onClick={handleClick}>
            {state}
          </div>
          <div className="card-date">{date}</div>
          <div className='edit-task' onClick={handleEditClick}>
            E
          </div>
        </>
      )}
    </div>
  );
}