import React from "react";
import { Mic, Stop } from "./Icons";
import { useMediaStreamStore } from "./stores";

let interval: NodeJS.Timer;

function parseTime(n: number) {
  const min = Math.floor(n / 60);
  const secs = n % 60;

  return `${min < 10 ? "0" + min : min}:${secs < 10 ? "0" + secs : secs}`;
}

const audioSlices: Blob[] = [];

function Recording() {
  const [holding, hold] = React.useState(false);

  const [time, setTime] = React.useState(0);

  const [loading, setMockLoading] = React.useState(false);

  const [audioSrc, setAudioSrc] = React.useState<string | undefined>(undefined);
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
    // mediaRecorder?.addEventListener("start", (ev) => {});

    mediaRecorder?.addEventListener("dataavailable", (ev) => {
      setMockLoading(true);

      audioSlices.push(ev.data);

      // const blob = new Blob(audioSlices, {type: 'audio/mpeg-3'})

      const audioUrl = URL.createObjectURL(ev.data);
      // const audio = new Audio(audioUrl);

      setTimeout(() => {
        // audio.play();

        setMockLoading(false);

        setAudioSrc(audioUrl);
      }, 1e3);

      // return clearTimeout(interval);
    });
  }, [mediaRecorder]);

  return (
    <div>
      <p style={{ userSelect: "none" }}> {parseTime(time)}</p>
      <button
        disabled={!mediaRecorder || loading}
        onPointerDown={startRecording}
        onPointerUp={stopRecording}
        onPointerLeave={stopRecording}
      >
        {mediaRecorder?.state === "recording" ? <Stop /> : <Mic />}
      </button>
      <br />
      <br />
      {audioSrc && <audio controls src={audioSrc}></audio>}
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
