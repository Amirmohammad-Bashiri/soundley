export function updateProgress(event, progressRef, audio) {
  if (audio.currentTime) {
    const width = progressRef.current.clientWidth;
    const clickX = event.nativeEvent.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
  }
}
