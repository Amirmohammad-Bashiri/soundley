export function getTrackLength(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  const convertedDuration = `${minutes}:${seconds}`;
  const result =
    convertedDuration.length === 3 ? convertedDuration : convertedDuration;

  return result;
}