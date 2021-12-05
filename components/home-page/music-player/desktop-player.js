import Link from "next/link";
import Image from "next/image";
import { ViewGridAddIcon } from "@heroicons/react/solid";
import cx from "clsx";

import { usePlayer } from "@store/player-context";
import { convertTrackCurrentTime } from "@utils/convert-track-current-time";
import { getTrackLength } from "@utils/get-track-length";

function DesktopPlayer() {
  const {
    goToNextTrack,
    goToPrevTrack,
    pause,
    play,
    isPlaying,
    toggleLoop,
    loop,
    toggleShuffle,
    isShuffled,
    currentTrack,
    currentTime,
    audio,
  } = usePlayer();

  const trackDuration =
    audio && audio.duration ? convertTrackCurrentTime(audio.duration) : "0:00";

  const actionButtonIcon = isPlaying ? (
    <button onClick={pause}>
      <i className="p-4 text-gray-100 bg-indigo-500 rounded cursor-pointer fas fa-pause fa-lg"></i>
    </button>
  ) : (
    <button onClick={play}>
      <i className="p-4 text-gray-100 bg-indigo-500 rounded cursor-pointer fas fa-play fa-lg"></i>
    </button>
  );

  return (
    <>
      <div className="hidden px-6 2xl:items-center 2xl:justify-between 2xl:flex text-gray-50">
        <h2 className="text-xl font-semibold">Player</h2>
        <button>
          <ViewGridAddIcon className="w-5 h-5 cursor-pointer xl:h-6 xl:w-6" />
        </button>
      </div>

      <div className="flex items-center justify-center px-16 mt-4 2xl:mt-10">
        <div className="relative w-32 h-24 rounded 2xl:w-full 2xl:h-80">
          {currentTrack.album ? (
            <Image
              src={currentTrack?.album?.cover_medium}
              alt="Track Cover"
              layout="fill"
            />
          ) : null}
          <div className="absolute top-0 left-0 w-32 h-24 rounded opacity-25 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800 2xl:w-full 2xl:h-80"></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 mt-5 2xl:space-y-2">
        <h1 className="text-xl font-semibold 2xl:text-2xl line-clamp-1 text-gray-50">
          {currentTrack.title ? currentTrack.title : "Song Title"}
        </h1>
        <Link href="/artists/:artistid">
          <a className="text-base text-gray-300 2xl:text-lg line-clamp-1">
            {currentTrack.artist ? currentTrack.artist.name : "Artist Name"}
          </a>
        </Link>
      </div>

      <div className="flex items-center px-6 mt-4 space-x-4">
        <time className="font-medium text-gray-100">
          {convertTrackCurrentTime(currentTime)}
        </time>
        <div className="w-full h-1 bg-gray-600 rounded cursor-pointer">
          <div className="relative w-20 h-full bg-gray-100 rounded">
            <div className="absolute right-0 w-3 h-3 bg-indigo-600 border-2 border-gray-100 rounded-full cursor-pointer -top-1"></div>
          </div>
        </div>
        <time className="font-medium text-gray-100">{trackDuration}</time>
      </div>

      <div className="mt-4 2xl:mt-10">
        <div className="flex items-center justify-center space-x-8">
          <button onClick={toggleLoop}>
            <i
              className={cx(
                "text-gray-100 cursor-pointer fas fa-redo-alt fa-lg",
                { "text-indigo-500": loop }
              )}></i>
          </button>
          <button onClick={goToPrevTrack}>
            <i className="text-gray-100 cursor-pointer fas fa-step-backward fa-lg"></i>
          </button>
          {actionButtonIcon}
          <button onClick={goToNextTrack}>
            <i className="text-gray-100 cursor-pointer fas fa-step-forward fa-lg"></i>
          </button>
          <button onClick={toggleShuffle}>
            <i
              className={cx(
                "text-gray-100 cursor-pointer fas fa-random fa-lg",
                { "text-indigo-500": isShuffled }
              )}></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default DesktopPlayer;
