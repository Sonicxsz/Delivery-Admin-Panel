import { useEffect } from "react";

export function useLocalMedia({ id }: { id: string }) {
  function getMedia() {
    return navigator.mediaDevices.getUserMedia({
      video: {
        height: 640,
        width: 640,
      },
      audio: true,
    });
  }

  useEffect(() => {
    const video = document.querySelector(id) as HTMLVideoElement;

    if (video) {
      getMedia().then((stream) => {
        video.srcObject = stream;
      });
    }
  }, []);
}
