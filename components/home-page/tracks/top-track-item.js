import Image from "next/image";
import Link from "next/link";
import { PlayIcon, PlusIcon, PauseIcon } from "@heroicons/react/solid";

import { convertTrackDuration } from "@utils/track-duration-converter";
import { usePlayer } from "@store/player-context";

function TopTrackItem({ track }) {
  const { isPlaying, trackId, findTrackAndSetData } = usePlayer();

  const actionButtonIcon =
    isPlaying && trackId === track.id ? (
      <PauseIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-6 xl:w-6" />
    ) : (
      <PlayIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-6 xl:w-6" />
    );

  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center space-x-5">
        <div
          className="relative w-16 h-16"
          style={{ minHeight: "4rem", minWidth: "4rem" }}>
          <Image
            src={track.artist.picture_medium}
            alt={track.title}
            layout="fill"
            objectFit="contain"
            className="rounded"
          />
          <div className="absolute top-0 left-0 w-16 h-16 rounded opacity-20 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <strong className="text-sm text-gray-100 line-clamp-1 md:text-lg">
            {track.title}
          </strong>
          <Link href={`/artists/${track.artist.id}`}>
            <a className="text-xs text-gray-300 md:text-sm line-clamp-1">
              {track.artist.name}
            </a>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        <time className="text-sm font-semibold text-gray-200">
          {convertTrackDuration(track.duration)}
        </time>
        <button
          onClick={() => {
            findTrackAndSetData(track.id, "topTracks");
            console.log(track);
          }}
          className="p-1 bg-gray-800 border border-gray-400 rounded">
          {actionButtonIcon}
        </button>
        <button className="hidden bg-gray-500 rounded md:block">
          <PlusIcon className="w-4 h-4 cursor-pointer xl:h-5 xl:w-5" />
        </button>
      </div>
    </li>
  );
}

export default TopTrackItem;
