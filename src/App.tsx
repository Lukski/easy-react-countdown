import React from 'react';
import logo from './logo.svg';
import './App.css';
import Countdown from './Countdown';

function App() {
  return (
    <div className="App">
      <Countdown initialSeconds={5} callbackOnEnd={null} placeholder='0' finishingMessage='0' audioStart={10}/>
    </div>
  );
}

export default App;
