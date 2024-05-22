import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const startStop = () => {
    setRunning(!running);
  };

  const reset = () => {
    setTime(0);
    setLaps([]);
    setRunning(false);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const deleteLap = (index) => {
    setLaps(laps.filter((lap, lapIndex) => lapIndex !== index));
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const getSeconds = `0${seconds}`.slice(-2);
    const getMinutes = `0${minutes}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="text-6xl font-mono mb-4">{formatTime(time)}</div>
      <div className="flex space-x-4">
        <button
          onClick={startStop}
          className={`px-6 py-2 text-lg font-semibold rounded transition ${
            running
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded text-white transition"
        >
          Reset
        </button>
        <button
          onClick={recordLap}
          className="px-6 py-2 text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 rounded text-white transition"
          disabled={!running}
        >
          Lap
        </button>
      </div>
      {laps.length > 0 && (
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-2 font-semibold">Lap Times</h2>
          <ul className="list-disc pl-5 space-y-1">
            {laps.map((lap, index) => (
              <li
                key={index}
                className="text-lg flex justify-between items-center"
              >
                <span>{formatTime(lap)}</span>
                <button
                  onClick={() => deleteLap(index)}
                  className="ml-4 px-2 py-1 text-sm font-semibold bg-red-500 hover:bg-red-600 rounded text-white transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
