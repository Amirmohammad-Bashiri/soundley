import PlaylistTracksItem from "./playlist-tracks-item";

function PlaylistTracksList({ tracks, playlistId }) {
  return (
    <ul className="w-full max-h-[430px] px-5 pt-2 pb-4 space-y-4 overflow-y-scroll bg-gray-800 divide-y-2 divide-gray-700 md:px-10">
      {tracks.map(track => (
        <PlaylistTracksItem
          key={track.id}
          track={track}
          playlistId={playlistId}
        />
      ))}
    </ul>
  );
}

export default PlaylistTracksList;
