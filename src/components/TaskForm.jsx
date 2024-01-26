import { useState } from 'react';
import * as Constants from './constants.js';
export function TaskForm() {
    const [taskFormData, setTaskFormData] = useState({
        name: "",
        date: ""
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convert selectedDate to a timestamp
        const timestamp = Date.parse(taskFormData.date);
    
        // Your form submission logic with the timestamp
        console.log('Timestamp:', timestamp);
    
        try {
          const newTask = {
            // replace with the actual properties of your Task object
            name: taskFormData.name,
            date: timestamp,
            user_id: 1,
            is_done:0
            // ... other properties
          };
    
          const response = await fetch(Constants.API_ENDPOINT + '/tasks/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // TODO  CHECK THE RESPONSE SO IR NOT GIVES AN ERROR
          // const data = await response.json();
          // console.log('Data from backend:', data);
          // You can set the data to state or handle it as needed
          // setTasks(data) or perform other operations
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    return (
        <div className="taskFormContainer">
            <form onSubmit={handleSubmit}>
                <label>
                    Task Name:
                    <input
                        type="text"
                        name="name"
                        value={taskFormData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Task Date:
                    <input
                        type="datetime-local"
                        name="date"
                        value={taskFormData.date}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}