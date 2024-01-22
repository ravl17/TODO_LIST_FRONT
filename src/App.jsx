// src/App.js
import React from 'react';
import TaskList from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import Week from './components/Week';
function App() {
    return (
        <div className="App">
            <TaskForm/>
            <Week />
        </div>
    );
}

export default App;
