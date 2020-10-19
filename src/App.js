import React from 'react';
import './App.css';
import {Game} from './components/Game'



function App() {
    return (
        <>
        <Game challengeSize={6} challengeRange={[2, 9]} seconds={10}/>
        </>
    );
}

export default App;
