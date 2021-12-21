function PlaylistTracksHeader({ playlistName }) {
  return (
    <header>
      <h1 className="text-5xl font-bold tracking-wide text-gray-100 line-clamp-1">
        {playlistName}
      </h1>
    </header>
  );
}

export default PlaylistTracksHeader;
