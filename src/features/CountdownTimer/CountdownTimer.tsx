import React, { useState, useEffect } from 'react';
const CountdownTimer = () => {
    interface TimeLeft {
        hours: number;
        minutes: number;
        seconds: number;
    }
    const calculateTimeLeft = () => {
        // Set a fixed target time for the flash sale to end (e.g., end of the current day)
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);
        
        const difference = endOfDay.getTime() - now.getTime();
        let timeLeft: TimeLeft;

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });


    const formatTime = (time: number): string => String(time).padStart(2, '0');

    return (
        <div className="flex items-center space-x-1 text-white">
            <span className="bg-black text-sm font-semibold px-2 py-1 rounded">{formatTime(timeLeft.hours)}</span>
            <span className="text-black text-xl">:</span>
            <span className="bg-black text-sm font-semibold px-2 py-1 rounded">{formatTime(timeLeft.minutes)}</span>
            <span className="text-black text-xl">:</span>
            <span className="bg-black text-sm font-semibold px-2 py-1 rounded">{formatTime(timeLeft.seconds)}</span>
        </div>
    );
};

export default CountdownTimer;