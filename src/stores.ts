import { create } from "zustand";

interface MediaStreamStore {
  stream?: MediaStream;
  mediaRecorder?: MediaRecorder;
  setMediaRecorder: (mediaRecorder: MediaRecorder) => void;
}

export const useMediaStreamStore = create<MediaStreamStore>()((set) => ({
  setMediaRecorder: (mediaRecorder) => {
    set({ mediaRecorder: mediaRecorder });
  },
}));
