import NewPlaylist from "./new-playlist";

function PlaylistsHeader() {
  return (
    <header className="text-gray-50 flex flex-col space-y-10 xl:space-y-0 xl:flex-row justify-between items-center">
      <h1 className="text-4xl tracking-wide font-bold md:text-6xl">
        Your Playlists
      </h1>

      <NewPlaylist />
    </header>
  );
}

export default PlaylistsHeader;
