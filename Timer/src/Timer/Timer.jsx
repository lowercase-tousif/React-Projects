import { useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [interValId, setIntervalId] = useState(null);

  const startTimer = () => {
    if (!isRunning) {
      const id = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(interValId);
      setIntervalId(null);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    if (isRunning) {
      clearInterval(interValId);
      setIntervalId(null);
    }
    setTime(0);
    setIsRunning(false);
  };

  if (time == 101) {
    alert("Free subscription ended");
    if (isRunning) {
      clearInterval(interValId);
      setIntervalId(null);
    }
    setTime(0);
    setIsRunning(false);
  }

  return (
    <div>
      <h1>Basic Timer</h1>
      <p>Time : {time}</p>

      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>stop</button>
      <button onClick={resetTimer}>reset</button>
    </div>
  );
};

export default Timer;
