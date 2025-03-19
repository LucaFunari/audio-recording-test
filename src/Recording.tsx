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

  const startRecording = React.useCallback(() => {
    hold(true);
    mediaRecorder?.start();
  }, [mediaRecorder]);
  const stopRecording = React.useCallback(() => {
    hold(false);

    mediaRecorder?.stop();
  }, [mediaRecorder]);

  React.useEffect(() => {
    mediaRecorder?.addEventListener("dataavailable", (ev) => {
      const audioUrl = URL.createObjectURL(ev.data);

      const audio = new Audio(audioUrl);

      audio.play();
    });
  }, [mediaRecorder]);

  return (
    <div>
      <p style={{ userSelect: "none" }}> {parseTime(time)}</p>

      <button
        disabled={!mediaRecorder}
        onPointerDown={startRecording}
        onPointerUp={stopRecording}
        onPointerLeave={stopRecording}
      >
        {holding ? <Stop /> : <Mic />}
      </button>
      <p>{mediaRecorder?.state}</p>
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
