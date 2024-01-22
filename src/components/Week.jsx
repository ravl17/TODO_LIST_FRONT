import React, { useState, useEffect } from 'react';
import Day from './Day';
import './Week.css'

function Week() {
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const timestampDayOfWeek = getWeekTimestamps();

    return (
        <div className="week-container">
            {daysOfWeek.map((day, index) => (
                <Day key={index} dayOfWeek={day} timestamp={timestampDayOfWeek[index]} />
            ))}
        </div>
    );
}

export default Week;
function getStartOfWeek() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysSinceSunday = dayOfWeek === 0 ? 0 : dayOfWeek - 1;
    const startOfWeek = new Date(now.getTime() - daysSinceSunday * 24 * 60 * 60 * 1000);
    startOfWeek.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    return startOfWeek.getTime();
}

// Function to get an array of timestamps for the 7 days of the current week
function getWeekTimestamps() {
    const startOfWeekTimestamp = getStartOfWeek();
    const dayTimestamps = [];

    for (let i = 0; i < 7; i++) {
        const dayTimestamp = startOfWeekTimestamp + (i+1) * 24 * 60 * 60 * 1000;
        dayTimestamps.push(dayTimestamp);
    }

    return dayTimestamps;
}
