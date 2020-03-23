import React, { useState, useEffect } from 'react';
import Clock from './Clock.js';

function Board() {
    const session = {
        sets:[
            {
                repeat: 4,
                exercises: [
                    {title:"FLOOR PULL", time: 40},
                    {title:"REST", time: 25},
                    {title:"OH PRESS / BUDDHA CLAP", time: 40},
                    {title:"REST", time: 25},
                    {title:"SQUAT", time: 40},
                    {title:"REST", time: 25},
                ]
            },
            {
                repeat: 2,
                exercises: [
                    {title:"MOUNTAIN CLIMBERS", time: 25},
                    {title:"REST", time: 30},
                    {title:"LUNGES", time: 25},
                    {title:"REST", time: 30},
                    {title:"BATWINGS / BENTOVER ROW", time: 25},
                    {title:"REST", time: 30},
                    {title:"MOUNTAIN CLIMBERS", time: 25},
                    {title:"REST", time: 30},
                ]
            }
        ]
    }

    const [idx, setIdx] = useState(-1);
    const [currentSetIdx, setCurrentSetIdx] = useState(0);
    const [currentSetCount, setCurrentSetCount] = useState(0);
    const [currentSession] = useState(session);
    const [sessionStatus, setSessionStatus] = useState("READY");
    const [currentExercise, setCurrentExercise] = useState({title: sessionStatus, time: -2, idx: -1});

    useEffect(() => {
        console.log("IDX", idx);
        const set = currentSession.sets[currentSetIdx];
        if (idx >= 0) {
            if (currentSetIdx < currentSession.sets.length) {
                if (idx < set.exercises.length) {
                    if (currentSetIdx === currentSession.sets.length - 1 && idx === set.exercises.length - 1 && currentSetCount + 1 === set.repeat) {
                        endSession();
                    }
                    else {
                        let x = set.exercises[idx];
                        setCurrentExercise({title: x.title , time: x.time, idx: idx});
                    }
                }
                else {
                    if (currentSetCount + 1 < set.repeat) {
                        setIdx(0);
                        setCurrentSetCount(setCurrentSet => currentSetCount + 1);
                    }
                    else {
                        setIdx(0);
                        setCurrentSetCount(0);
                        setCurrentSetIdx(currentSetIdx => currentSetIdx + 1);
                    }
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
            const set = currentSession.sets[currentSetIdx];
            return (<div>Set {currentSetCount + 1} / {set.repeat}</div>)
        }
        return null
    }

    function WorkoutView () {

        let rows = [];
        console.log(currentSession.sets);
        currentSession.sets.forEach(function (set, i) {
            rows.push(<tr key={i.toString() + 't'} className='active'>{set.repeat} SETS</tr>)
            const r = set.exercises.map((x,j) => {
                const activeClass = currentSetIdx === i && idx === j ? "active" : "";
                return (<tr key={i.toString() + j.toString()} className={activeClass}><td>{x.title}</td><td>{x.time}s</td></tr>)
            });

            rows.push(r);
            rows.push(<tr key={i.toString + 's'}><td>------------------</td></tr>);
        });

        rows.pop();

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