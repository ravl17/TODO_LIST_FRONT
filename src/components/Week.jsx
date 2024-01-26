import React, { useState, useEffect } from 'react';
import Day from './Day';
import './Week.css';

function Week() {
    const [week, setWeek] = useState(0); // Initialize with the current week
    const [timestampDayOfWeek, setTimestampDayOfWeek] = useState(Array(7).fill(null).map((_, index) => getWeekTimestamps(getStartOfWeekTimestamp(week))[index]));

    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const startOfWeekTimestamp = getStartOfWeekTimestamp(week);
    useEffect(() => {
        const newTimestampDayOfWeek = getWeekTimestamps(getStartOfWeekTimestamp(week));
        setTimestampDayOfWeek(newTimestampDayOfWeek);
    }, [week]); // Depend only on 'week' for this effect


    const navigateWeek = (direction) => {
        setWeek(week + direction);
    };

    return (
        <div className="week-container">
            <div className="week-selector">
                <button type="button" onClick={() => navigateWeek(-1)}>←</button>
                <p>{formatWeekText(startOfWeekTimestamp)}</p>
                <button type="button" onClick={() => navigateWeek(1)}>→</button>
            </div>
            <div className='week-days'>

                {timestampDayOfWeek.map((day, index) => (

                    <Day key={day} dayOfWeek={daysOfWeek[index]} timestampDay={day} />

                ))}
            </div>
        </div>
    );
}

export default Week;

function getStartOfWeekTimestamp(weekOffset) {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysSinceSunday = dayOfWeek === 0 ? 0 : dayOfWeek - 1;
    const startOfWeek = new Date(now.getTime() - daysSinceSunday * 24 * 60 * 60 * 1000);
    startOfWeek.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    // Adjust the start of the week based on the week offset
    startOfWeek.setDate(startOfWeek.getDate() + 7 * weekOffset);

    return startOfWeek.getTime();
}

function formatWeekText(startOfWeekTimestamp) {
    const startOfWeek = new Date(startOfWeekTimestamp);
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);

    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    const startMonth = startOfWeek.toLocaleString('default', { month: 'long' });
    const endMonth = endOfWeek.toLocaleString('default', { month: 'long' });

    return `${startDay} de ${startMonth} - ${endDay} de ${endMonth}`;
}

function getWeekTimestamps(startOfWeekTimestamp) {
    const dayTimestamps = [];
    for (let i = 0; i < 7; i++) {
        const dayTimestamp = startOfWeekTimestamp + i * 24 * 60 * 60 * 1000;
        dayTimestamps.push(dayTimestamp);
    }
    return dayTimestamps;
}
