import { createContext, useContext, useState } from "react";

import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";

const audio = new Audio();
const PlayerContext = createContext();

function PlayerProvider(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const { data } = useTopTracks(soundleyClient, "/tracks");

  const togglePlay = () => {
    setIsPlaying(prevState => {
      if (prevState) {
        audio.pause();
      } else {
        audio.play();
      }
      !prevState;
    });
  };

  const findTrackAndSetData = trackId => {
    const trackIndex = data.findIndex(track => track.id === trackId);
    if (trackIndex) {
      setCurrentTrack(data[trackIndex]);
      audio.src = data[trackIndex].preview;
    }
  };

  const context = {
    isPlaying,
    togglePlay,
    audio,
    currentTrack,
    findTrackAndSetData,
  };

  return <PlayerContext value={context} {...props} />;
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be within a PlayerProvider");
  }

  return context;
}

export default PlayerProvider;
