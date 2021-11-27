export function convertTrackDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  const convertedDuration = `${minutes}:${seconds}`;

  return convertedDuration;
}
