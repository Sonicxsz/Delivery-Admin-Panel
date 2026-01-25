import { useLocalMedia } from "./useLocalMedia";
const VIDEO_ID = "#local_video";

export function Webrtc() {
  useLocalMedia({ id: VIDEO_ID });

  return (
    <div>
      <div>
        <video id="local_video"></video>
      </div>
    </div>
  );
}
