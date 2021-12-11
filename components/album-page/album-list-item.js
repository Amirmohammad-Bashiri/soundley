import { PlayIcon, PlusIcon, PauseIcon } from "@heroicons/react/solid";
import cx from "clsx";

import { usePlayer } from "@store/player-context";
import { getTrackLength } from "@utils/get-track-length";

function AlbumListItem({ track }) {
  const { isPlaying, trackId, findTrackIndex } = usePlayer();

  const isThisTrackBeingPlayed = isPlaying && trackId === track.id;

  const actionButtonIcon = isThisTrackBeingPlayed ? (
    <PauseIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-7 xl:w-7" />
  ) : (
    <PlayIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-7 xl:w-7" />
  );

  const handlePlayClick = track => {
    findTrackIndex(track.id, "album");
  };

  return (
    <li className="flex items-center justify-between pt-4 space-x-1 text-gray-100 ">
      <strong
        onClick={() => handlePlayClick(track)}
        className={cx("text-sm cursor-pointer md:text-lg line-clamp-1", {
          "text-indigo-500": isThisTrackBeingPlayed,
        })}>
        {track.title}
      </strong>
      <div className="flex items-center space-x-5">
        <time className="text-sm font-semibold text-gray-200 md:text-base xl:text-lg">
          {getTrackLength(track.duration)}
        </time>
        <button onClick={() => handlePlayClick(track)}>
          {actionButtonIcon}
        </button>
        <button className="hidden bg-gray-500 rounded md:block">
          <PlusIcon className="w-4 h-4 cursor-pointer xl:h-6 xl:w-6" />
        </button>
      </div>
    </li>
  );
}

export default AlbumListItem;
