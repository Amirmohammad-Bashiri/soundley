import { PlayIcon, PlusIcon, PauseIcon } from "@heroicons/react/solid";

import { usePlayer } from "@store/player-context";
import { getTrackLength } from "@utils/get-track-length";

function AlbumListItem({ track }) {
  const { isPlaying, trackId, findTrackIndex, setAlbumId } = usePlayer();

  const actionButtonIcon = (
    <PlayIcon className="text-indigo-500 cursor-pointer w-7 h-7 xl:h-6 xl:w-6" />
  );

  const handlePlayClick = track => {
    findTrackIndex(track.id, "album");
  };

  return (
    <li className="flex items-center justify-between pt-4 text-gray-100 ">
      <strong onClick={() => handlePlayClick(track)} className="cursor-pointer">
        {track.title}
      </strong>
      <div className="flex items-center space-x-5">
        <time className="text-sm font-semibold text-gray-200">
          {getTrackLength(track.duration)}
        </time>
        <button onClick={() => handlePlayClick(track)}>
          {actionButtonIcon}
        </button>
        <button className="hidden bg-gray-500 rounded md:block">
          <PlusIcon className="w-4 h-4 cursor-pointer xl:h-5 xl:w-5" />
        </button>
      </div>
    </li>
  );
}

export default AlbumListItem;
