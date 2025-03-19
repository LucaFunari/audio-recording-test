import React from "react";
import "./App.css";
import Recording from "./Recording";
import { useMediaStreamStore } from "./stores";

function App() {
  const { setMediaRecorder } = useMediaStreamStore();

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/ogg",
          audioBitsPerSecond: 128000,
        });

        setMediaRecorder(mediaRecorder);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [setMediaRecorder]);

  return (
    <>
      <Recording />
      {/* <p className="read-the-docs"></p> */}
    </>
  );
}

export default App;
