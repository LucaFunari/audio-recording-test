import React from "react";
import { Mic, Stop } from "./Icons";
import { useMediaStreamStore } from "./stores";

let interval: NodeJS.Timer;

function parseTime(n: number) {
  const min = Math.floor(n / 60);
  const secs = n % 60;

  return `${min < 10 ? "0" + min : min}:${secs < 10 ? "0" + secs : secs}`;
}

function Recording() {
  const [holding, hold] = React.useState(false);

  const [time, setTime] = React.useState(0);

  const { mediaRecorder } = useMediaStreamStore();

  React.useEffect(() => {
    if (holding) {
      setTime(0);
      interval = setInterval(function () {
        setTime((curr) => curr + 1);
      }, 1e3);
    } else {
      clearInterval(interval);
    }
  }, [holding]);

  React.useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>{parseTime(time)}</p>

      {JSON.stringify(mediaRecorder)}
      <button
        disabled={!mediaRecorder}
        onPointerDown={() => hold(true)}
        onPointerUp={() => hold(false)}
        onPointerLeave={() => hold(false)}
      >
        {holding ? <Stop /> : <Mic />}
      </button>

      {/* <button
        onClick={() => {
          hold((curr) => !curr);
        }}
      >
        {holding ? <Stop /> : <Mic />}
      </button> */}
    </div>
  );
}

export default Recording;
