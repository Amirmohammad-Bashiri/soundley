export const hasAudioSourceChanged = (trackId, currentTrack) => {
  return currentTrack.id !== trackId;
};
