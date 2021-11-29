import { createContext, useContext, useState, useEffect } from "react";

import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";

const PlayerContext = createContext();

function PlayerProvider(props) {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const [trackId, setTrackId] = useState(null);
  const { data } = useTopTracks(soundleyClient, "/tracks");

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(prevState => !prevState);
  };

  const findTrackAndSetData = trackId => {
    const trackIndex = data.findIndex(track => track.id === trackId);
    console.log(data[trackIndex].preview);
    if (trackIndex) {
      setCurrentTrack(data[trackIndex]);
      setTrackId(trackId);
      if (!audio.src) {
        audio.src = data[trackIndex].preview;
      }
      togglePlay();
    }
  };

  const context = {
    isPlaying,
    togglePlay,
    audio,
    currentTrack,
    trackId,
    findTrackAndSetData,
  };

  return <PlayerContext.Provider value={context} {...props} />;
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be within a PlayerProvider");
  }

  return context;
}

export default PlayerProvider;
