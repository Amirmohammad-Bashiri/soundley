import { createContext, useContext, useState, useEffect, useRef } from "react";

import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";
import { hasAudioSourceChanged } from "@utils/has-source-audio-changed";

const PlayerContext = createContext();

function PlayerProvider(props) {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const [trackId, setTrackId] = useState(null);
  const [trackIndex, setTrackIndex] = useState(null);

  const firstLoad = useRef(true);
  const trackIndexRef = useRef(trackIndex);

  const { data: topTracks } = useTopTracks(soundleyClient, "/tracks");

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  // useEffect(() => {
  //   if (audio) {
  //     audio.addEventListener("ended", () => {
  //       if (trackIndexRef.current < topTracks.length - 1) {
  //         setTrackIndex(prevState => prevState + 1);
  //         trackIndexRef.current = trackIndexRef.current + 1;
  //         setIsPlaying(false);
  //       } else {
  //         setTrackIndex(0);
  //         trackIndexRef.current = 0;
  //         setIsPlaying(false);
  //       }
  //     });
  //   }

  //   return () => {
  //     if (audio) {
  //       if (trackIndexRef.current < topTracks.length - 1) {
  //         setTrackIndex(prevState => prevState + 1);
  //         trackIndexRef.current = trackIndexRef.current + 1;
  //       } else {
  //         setTrackIndex(0);
  //         trackIndexRef.current = 0;
  //       }
  //     }
  //   };
  // }, [audio]);

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
    if (!audio.src || hasAudioSourceChanged(trackId, currentTrack)) {
      audio.src = topTracks[trackIndex].preview;
    }
    console.log(hasAudioSourceChanged(trackId, currentTrack));
    console.log("TRACK ID: ", trackId, "CURRENT TRACK ID: ", currentTrack.id);
    togglePlay(hasAudioSourceChanged(trackId, currentTrack));
  };

  const findTrackIndex = (trackId, queryKey) => {
    if (queryKey === "topTracks") {
      const trackIndex = topTracks.findIndex(track => track.id === trackId);
      if (trackIndex) {
        setTrackId(trackId);
        setTrackIndex(trackIndex);
        trackIndexRef.current = trackIndex;

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

    setCurrentTrack(topTracks[trackIndex]);
    setAudioData();
  }, [trackIndex, trackIndexRef.current]);

  const goToNextTrack = () => {
    if (trackIndexRef.current < topTracks.length - 1) {
      setTrackIndex(prevState => prevState + 1);
      trackIndexRef.current = trackIndexRef.current + 1;
      setTrackId(topTracks[trackIndex + 1].id);
      setIsPlaying(false);
    } else {
      setTrackIndex(0);
      trackIndexRef.current = 0;
      setTrackId(topTracks[0].id);
      setIsPlaying(false);
    }
  };

  const context = {
    isPlaying,
    togglePlay,
    audio,
    currentTrack,
    trackId,
    findTrackIndex,
    goToNextTrack,
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
