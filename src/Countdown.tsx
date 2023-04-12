import React from 'react';
import { useRef, useState, useEffect } from 'react';

interface CountdownProps {
    initialSeconds:number,
    callbackOnEnd:(() => void) | null,
    placeholder:string,
    finishingMessage:string,
    audioStart:number
}

function Countdown({initialSeconds, callbackOnEnd, placeholder, finishingMessage, audioStart}:CountdownProps){
  const [currentSeconds, setCurrentSeconds] = useState(-1);
  const [uninitialized, setUninitialized] = useState(true);
  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    if(currentSeconds >= 0){
      tick();
      if(currentSeconds === 0){
        if(worker.current !== null){
            worker.current.terminate();
            if(callbackOnEnd){
                callbackOnEnd();
            }
        }
      }
    }
  }, [currentSeconds]);

  useEffect(() => {
    startTimer(initialSeconds);
  }, [initialSeconds]);

  function startTimer(seconds:number){
    if(seconds > 0){
      if(worker.current){
        worker.current.terminate();
      }
      const blob = new Blob([`(${countdownworker.toString()})()`], { type: "text/javascript" });
      worker.current = new Worker(URL.createObjectURL(blob));
      worker.current.onmessage = (e) => {
        setCurrentSeconds((seconds) => seconds - 1);
      }
      worker.current.postMessage(seconds);
      setCurrentSeconds(seconds);
      setUninitialized(false);
    }
  }

  function endTimer(){
    if(worker.current){
      worker.current.terminate();
    }
  }

  function tick(){
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

  function countdownworker(){
    let interval;

    onmessage = (event) => {
      interval = setInterval(function() {
        postMessage(event.data);
      }, 1000);
    };
  }

  return(<div>{uninitialized ? placeholder: currentSeconds}</div>);
}

export default Countdown;