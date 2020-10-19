import React, {useState, useEffect} from "react";
import {Number} from './Number'
import _ from 'lodash';

const bgColors = {
    playing: 'lightblue',
    won: 'green',
    lost: 'red',
};

export const Game = (props) => {
    const [status, setStatus] = useState('new')
    const [selectedValues, setSelectedValues] = useState([])
    const [selectedId, setSelectedId] = useState([])
    const [seconds, setSeconds] = useState(props.seconds)
    const [challengeNumbers, setChallengeNumbers] = useState([]);
    const [target, setTarget] = useState(null)

    const isNumberAvailable = (index) => !selectedId.includes(index);




    useEffect(() => {
        generateNumbers();
    }, [])


    const selectNumber = (numberVal, itemId) => {
        if (status !== 'playing') {
            return
        }

        const newValues=[...selectedValues, numberVal]
        setSelectedValues(newValues)
        setSelectedId([...selectedId, itemId]);
        setStatus(calcGameStatus(newValues))

    }


    const calcGameStatus = (selectedValues) => {
        const values = selectedValues

        const sumSelected = values.reduce((acc, curr) => acc + curr, 0);
        if (sumSelected < target) {
            return 'playing';
        }
        return sumSelected === target ? 'won' : 'lost';
    }

    const generateNumbers = () => {
        const randomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const newChallengeNumber = Array.from({length: props.challengeSize}).map(() => randomNumberBetween(...props.challengeRange));
        setChallengeNumbers(newChallengeNumber)
        setTarget(_.sampleSize(newChallengeNumber, props.challengeSize - 2).reduce((acc, curr) => acc + curr, 0));
    }

    const startGame = () => {
        setStatus('playing')
        let time = 10;
        const myInterval = setInterval(() => {
            time--
            setSeconds(time)
            if (time === 0) {
                clearInterval(myInterval);
            }
        }, 1000)
    }

    const handleAgain = () => {
        window.location.reload();

    }


    return (
        <div className="game">
            <div className='header'>
                <h1>Count Game</h1>
            </div>

            {status === 'new' ? (<button onClick={startGame}>Start</button>) : (<div className="timer">{seconds}</div>)}
            {['won', 'lost'].includes(status)  && (<button onClick={handleAgain}>Play Again </button>)}
            {(seconds === 0) && !['won', 'lost'].includes(status) && <button onClick={handleAgain}>Play Again </button> }




            <div className="target" style={{backgroundColor: bgColors[status]}}>{status === 'new' ? '?' : target}</div>
            <div className="challenge-numbers">
                {challengeNumbers.map((value, index) => {
                    return <Number key={index} id={index} value={status === 'new' ? '?' : value}
                                   clickable={isNumberAvailable(index)} onClick={selectNumber}
                    />
                })}
            </div>
        </div>
    )
}
