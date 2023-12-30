import { useState } from "react";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";

const BellSongBtn = () => {
  const [mute, setMute] = useState(true);

  return (
    <div>
      <button
        onClick={() => setMute(!mute)}
        className="rounded-full w-10 h-10 border-red-500 border-2 flex justify-center items-center text-red-500"
      >
        {mute ? <PlayIcon /> : <PauseIcon />}
      </button>
      <audio
        controls
        src="/bells.wav"
        loop
        muted={mute}
        autoPlay
        style={{ opacity: 0, position: "absolute", top: -100 }}
      />
    </div>
  );
};

export default BellSongBtn;
