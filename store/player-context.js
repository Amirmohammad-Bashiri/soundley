import { createContext, useContext, useState, useEffect, useRef } from "react";

import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";
import { hasAudioSourceChanged } from "@utils/has-source-audio-changed";

const PlayerContext = createContext();

function PlayerProvider(props) {
  const firstLoad = useRef(true);

  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const [trackId, setTrackId] = useState(null);
  const [trackIndex, setTrackIndex] = useState(null);

  const { data: topTracks } = useTopTracks(soundleyClient, "/tracks");

  const audioStatus = audio && audio.ended;

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        console.log(audio.ended);
      });
    }

    return () => {
      if (audio) {
        audio.addEventListener("ended", () => {
          setIsPlaying(false);
          console.log(audio.ended);
        });
      }
    };
  }, [audio]);

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

  const setAudioData = () => {
    setCurrentTrack(topTracks[trackIndex]);
    if (!audio.src || hasAudioSourceChanged(trackId, currentTrack)) {
      audio.src = topTracks[trackIndex].preview;
    }
    togglePlay(hasAudioSourceChanged(trackId, currentTrack));
  };

  const findTrackIndex = (trackId, queryKey) => {
    if (queryKey === "topTracks") {
      const trackIndex = topTracks.findIndex(track => track.id === trackId);
      if (trackIndex) {
        setTrackId(trackId);
        setTrackIndex(trackIndex);

        if (!hasAudioSourceChanged(trackId, currentTrack)) {
          setAudioData();
        }
      }
    }
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;

      return;
    }

    setAudioData();
  }, [trackIndex]);

  const context = {
    isPlaying,
    togglePlay,
    audio,
    currentTrack,
    trackId,
    findTrackIndex,
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
