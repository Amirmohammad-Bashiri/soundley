import { XCircleIcon } from "@heroicons/react/solid";

import { usePlaylistPopup } from "@store/playlist-popup-context";
import { useAddToPlaylist } from "@hooks/useAddToPlaylist";
import { useRemovePlaylist } from "@hooks/useRemovePlaylist";

function PlaylistItem({ playlist }) {
  const { selectedTrackForPlaylist, togglePlaylistPopup } = usePlaylistPopup();
  const addToPlaylistMutation = useAddToPlaylist();
  const removePlaylistMutation = useRemovePlaylist();

  const handlePlaylistClick = () => {
    if (selectedTrackForPlaylist) {
      addToPlaylistMutation.mutate({
        playlistId: playlist.id,
        track: selectedTrackForPlaylist,
      });
    }

    togglePlaylistPopup();
  };

  const handleRemovePlaylist = () => {
    removePlaylistMutation.mutate({ playlistId: playlist.id });
  };

  return (
    <li className="flex items-center justify-between p-4 bg-gray-800 rounded md:px-4 md:py-6">
      <strong
        onClick={handlePlaylistClick}
        className="text-base text-gray-100 cursor-pointer md:text-lg line-clamp-1">
        {playlist.name}
      </strong>

      <button className="cursor-pointer" onClick={handleRemovePlaylist}>
        <XCircleIcon className="w-6 h-6 text-lg text-rose-500" />
      </button>
    </li>
  );
}

export default PlaylistItem;
