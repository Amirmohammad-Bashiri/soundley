import PlaylistItem from "./playlist-item";

function Playlist({ data }) {
  return (
    <ul className="w-full py-8 space-y-5 overflow-y-scroll max-h-[600px]">
      {data.playlists.map(playlist => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </ul>
  );
}

export default Playlist;
