import { createContext, useContext, useState, useEffect } from "react";

import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";
import { hasAudioSourceChanged } from "@utils/has-source-audio-changed";

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

  const togglePlay = trackChanged => {
    if (isPlaying && trackChanged) {
      // if playing and track is changed pause audio then play
      audio.pause();
      audio.play();
      setIsPlaying(true);
    } else if (isPlaying && !trackChanged) {
      // if playing and track is not changed pause the audio
      audio.pause();
      setIsPlaying(false);
    } else if (!isPlaying) {
      // if not playing play the audio
      audio.play();
      setIsPlaying(true);
    }
  };

  const findTrackAndSetData = trackId => {
    const trackIndex = data.findIndex(track => track.id === trackId);
    if (trackIndex) {
      setCurrentTrack(data[trackIndex]);
      setTrackId(trackId);
      if (!audio.src || hasAudioSourceChanged(trackId, currentTrack)) {
        audio.src = data[trackIndex].preview;
      }
      togglePlay(hasAudioSourceChanged(trackId, currentTrack));
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
