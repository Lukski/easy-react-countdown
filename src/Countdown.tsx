import React from 'react';
import { useRef, useState, useEffect } from 'react';

interface CountdownProps {
    targetDate? : Date | null,
    callbackOnEnd? : (() => void) | null,
    placeholder? : JSX.Element,
    finishingMessage? : string,
    audioStart? : number
}

function Countdown({targetDate = null, callbackOnEnd = null, placeholder = (<div>0</div>), finishingMessage = "0", audioStart = -1}:CountdownProps){
  const currentSeconds = targetDate === null ? -1 : Math.floor((targetDate.getTime() - new Date().getTime()) / 1000);
  // elapsedSeconds is currently only used to trigger a rerender every tick
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [uninitialized, setUninitialized] = useState(true);
  const worker = useRef<Worker | null>(null);

  // cleanup on unmount
  useEffect( () => () => endTimer(), [] );

  useEffect(() => {
    if(currentSeconds >= 0){
      tick();
      if(currentSeconds <= 0){
        if(worker.current !== null){
          worker.current.terminate();
          if(callbackOnEnd !== null){
            callbackOnEnd();
          }
        }
      }
    }
  }, [currentSeconds]);

  useEffect(() => {
    startTimer(currentSeconds);
  }, [targetDate]);

  function startTimer(seconds:number){
    if(seconds > 0){
      if(worker.current){
        worker.current.terminate();
      }
      // create webworker for 1 second intervals (needed for chrome to make sure it runs every second when tab is not in focus)
      const blob = new Blob([`(${countdownworker.toString()})()`], { type: "text/javascript" });
      worker.current = new Worker(URL.createObjectURL(blob));
      worker.current.onmessage = (e) => {
        setElapsedSeconds ((x) => x + 1);
      }
      worker.current.postMessage(seconds);
      setUninitialized(false);
    }
  }

  function endTimer(){
    if(worker.current){
      worker.current.terminate();
    }
  }

  function tick(){
    if ('speechSynthesis' in window) {
      let msg = new SpeechSynthesisUtterance();
      if(currentSeconds === 0){
        msg.text = finishingMessage;
      }
      else{
        msg.text = (currentSeconds).toString();
      }
      msg.rate = 1.5;
      msg.volume = 0.5;
      if(currentSeconds <= 10){
        msg.rate = 1;
        msg.volume = 1;
      }
      if(audioStart === -1 || currentSeconds <= audioStart){
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
      }
    }
  }

  function countdownworker(){
    let interval;
    onmessage = (event) => {
      interval = setInterval(function() {
        postMessage(event.data);
      }, 1000);
    };
  }

  return(<div className='simple-react-countdown'>{uninitialized ? placeholder: currentSeconds}</div>);
}

export default Countdown;