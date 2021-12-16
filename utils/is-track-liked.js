export function isTrackLiked(currentTrack, likes) {
  const track = likes.find(track => track.id === currentTrack.id);

  if (track) {
    return true;
  }

  return false;
}
