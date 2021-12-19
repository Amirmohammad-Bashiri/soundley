import { usePlaylistPopup } from "@store/playlist-popup-contenxt";

function PlaylistItem({ playlist }) {
  const { selectPlaylist } = usePlaylistPopup();

  const handlePlaylistClick = () => {
    selectPlaylist(playlist.id);
  };

  return (
    <li
      onClick={handlePlaylistClick}
      className="p-4 bg-gray-800 rounded cursor-pointer md:px-4 md:py-6">
      <strong className="text-base text-gray-100 md:text-lg line-clamp-1">
        {playlist.name}
      </strong>
    </li>
  );
}

export default PlaylistItem;
