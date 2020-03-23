import React, { useState, useEffect } from 'react';
import Clock from './Clock.js';

function Board() {
    const session = {
        sets: 4,
        set: [
            {title:"SQUAT PULLS", time: 35},
            {title:"ROWS", time: 35},
            {title:"REST", time: 25},
            {title:"MB OH PRESS", time: 35},
            {title:"PUSH UPS", time: 35},
            {title:"REST", time: 25},
            {title:"SQUATS", time: 35},
            {title:"KB DEADLIFTS", time: 35},
            {title:"REST", time: 25}
        ]
    }

    const [idx, setIdx] = useState(-1);
    const [currentSet, setCurrentSet] = useState(0);
    const [currentSession] = useState(session);
    const [sessionStatus, setSessionStatus] = useState("READY");
    const [currentExercise, setCurrentExercise] = useState({title: sessionStatus, time: -2, idx: -1});

    useEffect(() => {
        console.log("IDX", idx);
        if (idx >= 0) {
            if (idx < currentSession.set.length) {
                if (idx === currentSession.set.length - 1 && currentSet + 1 === currentSession.sets) {
                    endSession();
                }
                else {
                    let x = currentSession.set[idx];
                    setCurrentExercise({title: x.title , time: x.time, idx: idx});
                }
            }
            else {
                if (currentSet + 1 < currentSession.sets) {
                    setIdx(0);
                    setCurrentSet(setCurrentSet => currentSet + 1);
                }
                else {
                    endSession();    
                }
            }
        }
    }, [idx, currentSession])

    function ActionButton () {
        if (sessionStatus === "READY") {
            return (<button onClick={startSession}>Start Session</button>)
        }
        if (sessionStatus === "ACTIVE") {
            return (<button onClick={nextExercise}>Skip Exercise</button>)
        }
        return null;
    }
    
    function SetCounter () {
        if (sessionStatus === "ACTIVE") {
            return (<div>Set {currentSet + 1} / {currentSession.sets}</div>)
        }
        return null
    }

    function WorkoutView () {
        const rows = currentSession.set.map((x,i) => {
            const activeClass = idx === i ? "active" : "";
            return (<tr key={i.toString()} className={activeClass}><td>{x.title}</td><td>{x.time}s</td></tr>)
        });

        return (
            <table>
                <tbody>{rows}</tbody>
            </table>
        )
    }

    return (
        <div>
            <SetCounter />
            <Clock exercise={currentExercise} onTimerDone={onTimerDoneHandler}/>
            <ActionButton />
            <WorkoutView />
        </div>
    )

    function startSession () {
        setSessionStatus("ACTIVE");
        nextExercise();
    }

    function endSession () {
        setIdx(-1);
        setSessionStatus("COMPLETE");
        setCurrentExercise({title: "COMPLETE" , time: -2, idx: -1})
    }

    function nextExercise() {
        setIdx(idx => idx + 1);   
    }

    function onTimerDoneHandler() {
        nextExercise();
    }
}

export default Board;