function Playlist({ data }) {
  return (
    <ul>
      {data.playlists.map(playlist => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  );
}

export default Playlist;
