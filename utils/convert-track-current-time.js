export function convertTrackCurrentTime(time) {
  return (
    padZero(parseInt((time / 60) % 60)) + ":" + padZero(parseInt(time % 60))
  );
}
function padZero(value) {
  return value < 10 ? "0" + value : value;
}
