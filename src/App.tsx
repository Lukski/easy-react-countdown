import React from 'react';
import './App.css';
import Countdown from './Countdown';

function App() {
  return (
    <div className="App">
      <Countdown targetDate={new Date(Date.now() + 10000)} callbackOnEnd={undefined} placeholder='0' finishingMessage='0' audioStart={10}/>
    </div>
  );
}

export default App;
