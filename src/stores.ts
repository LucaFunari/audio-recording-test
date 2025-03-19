import { create } from "zustand";

interface MediaStreamStore {
  stream?: MediaStream;
  mediaRecorder?: MediaRecorder;
  setMediaRecorder: (mediaRecorder: MediaRecorder) => void;
}

export const useMediaStreamStore = create<MediaStreamStore>()((set) => ({
  setMediaRecorder: (mediaRecorder) => {
    console.debug(1);
    set({ mediaRecorder: mediaRecorder });
  },
}));
