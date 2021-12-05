import * as React from "react";
import shuffle from "lodash.shuffle";

import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";
import { hasAudioSourceChanged } from "@utils/has-source-audio-changed";

const PlayerContext = React.createContext();

function PlayerProvider(props) {
  const audio = React.useMemo(
    () => (typeof Audio !== "undefined" ? new Audio() : undefined),
    []
  );

  const { data: topTracks } = useTopTracks(soundleyClient, "/tracks");

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState({});
  const [trackId, setTrackId] = React.useState(null);
  const [trackIndex, setTrackIndex] = React.useState(null);
  const [loop, setLoop] = React.useState(false);
  const [isShuffled, setIsShuffled] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [tracksData, setTracksData] = React.useState(topTracks);

  const firstLoad = React.useRef(true);
  const trackIndexRef = React.useRef(trackIndex);

  React.useEffect(() => {
    audio.loop = loop;
  }, [loop, audio]);

  React.useEffect(() => {
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    return () =>
      audio.removeEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
  }, [audio]);

  React.useEffect(() => {
    if (isShuffled) {
      setTracksData(shuffle(tracksData));
      // const trackIndex = tracksData.findIndex(track => track.id === trackId);
      // setCurrentTrack(tracksData[trackIndex]);
      // setTrackId(tracksData[trackIndex].id);
    } else {
      setTracksData(topTracks);
    }
  }, [isShuffled]);

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
      audio.src = tracksData[trackIndex]?.preview;
    }
    togglePlay(hasAudioSourceChanged(trackId, currentTrack));
  };

  const findTrackIndex = (trackId, queryKey) => {
    if (queryKey === "topTracks") {
      const trackIndex = tracksData.findIndex(track => track.id === trackId);
      setTrackId(trackId);
      setTrackIndex(trackIndex);
      trackIndexRef.current = trackIndex;

      if (!hasAudioSourceChanged(trackId, currentTrack)) {
        setAudioData();
      }
    }
  };

  React.useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    setCurrentTrack(tracksData[trackIndex]);
    setAudioData();

    // eslint-disable-next-line
  }, [trackIndex, trackIndexRef.current]);

  const goToNextTrack = () => {
    if (trackIndexRef.current < tracksData.length - 1) {
      setTrackIndex(prevState => prevState + 1);
      trackIndexRef.current = trackIndexRef.current + 1;
      setTrackId(tracksData[trackIndex + 1].id);
      setIsPlaying(false);
    } else {
      setTrackIndex(0);
      trackIndexRef.current = 0;
      setTrackId(tracksData[0].id);
      setIsPlaying(false);
    }
  };

  const goToPrevTrack = () => {
    const lastElementIndex = tracksData.length - 1;

    if (trackIndexRef.current > 0) {
      setTrackIndex(prevState => prevState - 1);
      trackIndexRef.current = trackIndexRef.current - 1;
      setTrackId(tracksData[trackIndex - 1].id);
      setIsPlaying(false);
    } else {
      setTrackIndex(lastElementIndex);
      trackIndexRef.current = lastElementIndex;
      setTrackId(tracksData[lastElementIndex].id);
      setIsPlaying(false);
    }
  };

  const play = () => {
    if (!trackId) {
      return;
    }
    setIsPlaying(true);
    audio.play();
  };

  const pause = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const toggleLoop = () => {
    setLoop(prevState => !prevState);
  };

  const toggleShuffle = () => {
    setIsShuffled(prevState => !prevState);
  };

  React.useEffect(() => {
    audio.addEventListener("ended", () => {
      if (trackIndexRef.current < tracksData.length - 1) {
        setTrackId(tracksData[trackIndexRef.current + 1].id);
        trackIndexRef.current = trackIndexRef.current + 1;
        setTrackIndex(trackIndexRef.current);
        setIsPlaying(false);
      } else {
        setTrackId(tracksData[0].id);
        trackIndexRef.current = 0;
        setTrackIndex(trackIndexRef.current);
        setIsPlaying(false);
      }
    });

    return () => {
      audio.removeEventListener("ended", () => {
        if (trackIndexRef.current < tracksData.length - 1) {
          setTrackId(tracksData[trackIndexRef.current + 1].id);
          trackIndexRef.current = trackIndexRef.current + 1;
          setTrackIndex(trackIndexRef.current);
          setIsPlaying(false);
        } else {
          trackIndexRef.current = 0;
          setTrackIndex(trackIndexRef.current);
          setTrackId(tracksData[0].id);
          setIsPlaying(false);
        }
      });
    };
  }, [audio]);

  const context = {
    isPlaying,
    togglePlay,
    audio,
    currentTrack,
    trackId,
    findTrackIndex,
    goToNextTrack,
    goToPrevTrack,
    play,
    pause,
    toggleLoop,
    loop,
    toggleShuffle,
    isShuffled,
    currentTime,
  };

  return <PlayerContext.Provider value={context} {...props} />;
}

export function usePlayer() {
  const context = React.useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be within a PlayerProvider");
  }

  return context;
}

export default PlayerProvider;
