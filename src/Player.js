import React, { useState, useEffect } from "react";

const useAudio = url => {
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
    setAudio(new Audio(url));
    console.log("button pushed")
  }

  useEffect(() => {
      // playing ? audio.play() : audio.pause();
      audio.play()
    },
    [playing]
  );
  

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>🔉</button>
    </div>
  );
};

export default Player;