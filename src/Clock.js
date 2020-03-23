import React, { useState, useEffect } from 'react';

function Clock(props) {
    const [timeLeft, setTimeLeft] = useState(props.exercise.time);
    const [timerID, setTimerID] = useState(null)

    useEffect(() => {
        console.log("timeLeft", timeLeft);
        if (timeLeft === -1) {
            stopClock();
            props.onTimerDone();
        }
    }, [timeLeft]);

    useEffect(() => {
        console.log("props.time", props.exercise.time);
        stopClock();
        setTimeLeft(props.exercise.time);
        if (props.exercise.time > 0) {
            startClock();
        }
    }, [props.exercise.idx]);

    function startClock() {
        let t = setInterval(() => tick(), 1000)
        setTimerID(t);
        return t;
    }

    function stopClock() {
        console.log("STOP", timerID);
        clearInterval(timerID);
    }

    function tick() {
        setTimeLeft(timeLeft => timeLeft - 1);
    }

    return (
        <div>
        <div>{props.exercise.title}</div>
        <div>{timeLeft > -1 && timeLeft}</div>
        </div>
        
    )
}

export default Clock;