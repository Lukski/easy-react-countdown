# simple-react-countdown
A simple React Countdown Component

# Getting started
Install using npm:
```sh
npm install easy-react-countdown
```

# Features
* Counts down seconds, while also displaying the remaining seconds
* Audible Countdown using the Speechsynthesis browser API
* Using webworkers to make sure the countdown actually runs every second, also on chrome when the tab is not focused

# Examples
Create a 5 second countdown:

```js
import React from 'react';
import Countdown from 'easy-react-countdown';

function App() {
  return (
    <div className="App">
      <Countdown targetDate={new Date(Date.now() + 5300)}/>
    </div>
  );
}

export default App;
```

# Props

## targetDate
default null
a Date object indicating the time until which the countdown shall run.
Set to null to deactivate the countdown

## callbackOnEnd
default null
a function to be executed when the countdown runs out.

## placeholder
default <div></div>
JSX that will be displayed before the countdown is started (when the countdown is initialized with targetDate null)

## finishingMessage
default "0"
String to be read at the end of the countdown (at 0)

## audioStart
default -1
int indicating from which number the loud text-to-speech countdown starts. -1 for always count loudly.

# Known Issues

## The countdown is not exact by up to 1 second
The component counts down in full seconds from when it starts the webworker, so unless this happens at the same milliseconds as the targetDate which is very unlikely, the countdown will not be exact to the milliseconds.
Maybe I'll try improving this in the future, but no guarantee

## I don't hear the countdown in Chrome
In Chrome the Speechsynthesis API used for the Text-to-speech does not work without user interaction. But for example if you have a button to start the countdown it should work.
If you know any workarounds I'd be interested, otherwise this will probably stay this way.
