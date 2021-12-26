export function getTrackLength(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
