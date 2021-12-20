import PlaylistItem from "./playlist-item";

function Playlists({ data }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
      {data.playlists.map(playlist => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </ul>
  );
}

export default Playlists;
