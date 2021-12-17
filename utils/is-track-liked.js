export function isTrackLiked(trackInfo, likes) {
  const track = likes.find(track => track.id === trackInfo.id);

  if (track) {
    return true;
  }

  return false;
}
