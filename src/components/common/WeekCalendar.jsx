import React, { useEffect } from 'react';
import './WeekCalendar.css'; // Place your styles here or use Tailwind if preferred

const WeekCalendar = () => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        const date = new Date();
        let dayNum = date.getDay();
        dayNum = (dayNum === 0) ? 6 : dayNum - 1;

        const weekItems = document.querySelectorAll(".week li");
        if (weekItems[dayNum]) {
            const active = weekItems[dayNum];
            active.classList.add('current');

            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            const h1 = document.createElement('h1');
            h1.innerHTML = day;
            active.appendChild(h1);

            const h5 = document.createElement('h5');
            h5.innerHTML = month;
            active.appendChild(h5);

            const h3 = document.createElement('h3');
            h3.innerHTML = year;
            active.appendChild(h3);
        }
    }, []);

    return (
        <div id="main-content" className="main-content title-font text-center justify-content-center d-flex align-items-center">
            <div className="container">
                <div className="mb-5">
                    <div className="container d-flex align-items-center justify-content-center">
                        <div className="row">
                            <ul className="week">
                                <li>Mon</li>
                                <li>Tue</li>
                                <li>Wed</li>
                                <li>Thu</li>
                                <li>Fri</li>
                                <li>Sat</li>
                                <li>Sun</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <h2 className="d-inline text-color" style={{ fontSize: '70px' }}>Welcome to </h2>&nbsp;
                <h2 className="typing-animation d-inline" style={{ fontSize: '70px' }}>
                    <span id="typingText"></span>
                </h2>
            </div>
        </div>
    );
};

export default WeekCalendar;
