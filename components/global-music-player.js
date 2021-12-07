import { useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import cx from "clsx";
import { useMediaQuery } from "react-responsive";

import { usePlayer } from "@store/player-context";
import { convertTrackCurrentTime } from "@utils/convert-track-current-time";
import { updateProgress } from "@utils/update-progress";

function GlobalMusicPlayer() {
  const { pathname } = useRouter();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const progressRef = useRef();

  const playerInfo = usePlayer();

  const progressHandler = e => {
    updateProgress(e, progressRef, playerInfo.audio);
  };

  const trackTitle = playerInfo.currentTrack.title
    ? playerInfo.currentTrack.title
    : "";
  const trackArtist = playerInfo.currentTrack.artist
    ? playerInfo.currentTrack.artist.name
    : "";

  const percentage =
    playerInfo.audio && playerInfo.currentTime
      ? (playerInfo.currentTime / playerInfo.audio.duration) * 100
      : 0;
  const trackDuration =
    playerInfo.audio && playerInfo.audio.duration
      ? convertTrackCurrentTime(playerInfo.audio.duration)
      : "0:00";

  const actionButtonIcon = playerInfo.isPlaying ? (
    <button onClick={playerInfo.pause}>
      <i className="text-gray-100 cursor-pointer fas fa-pause fa-lg"></i>
    </button>
  ) : (
    <button onClick={playerInfo.play}>
      <i className="text-gray-100 cursor-pointer fas fa-play fa-lg"></i>
    </button>
  );

  const shouldDisplay = pathname === "/" && isDesktopOrLaptop ? "none" : "flex";

  return (
    <div
      style={{ display: shouldDisplay }}
      className="fixed z-30 flex items-center justify-between w-full h-24 px-5 -mb-1 bg-black xl:space-x-5 xl:-mb-0 opacity-95 bottom-16 xl:bottom-0 xl:right-0">
      <div className="flex items-center space-x-5">
        <div className="relative w-14 h-14 xl:w-16 xl:h-16">
          {playerInfo.currentTrack.album ? (
            <Image
              src={playerInfo.currentTrack?.album?.cover_medium}
              alt="Track Cover"
              layout="fill"
              className="rounded"
            />
          ) : null}
          <div className="rounded opacity-25 w-14 h-14 xl:w-16 xl:h-16 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
        </div>

        <div className="flex flex-col">
          <strong className="text-gray-100 line-clamp-1 md:text-lg">
            {trackTitle}
          </strong>
          <small className="font-semibold text-gray-300 line-clamp-1 md:text-base">
            {trackArtist}
          </small>
        </div>
      </div>

      <div className="items-center flex-grow hidden px-6 space-x-6 xl:flex">
        <time className="flex-grow-0 flex-shrink-0 font-medium text-gray-100">
          {convertTrackCurrentTime(playerInfo.currentTime)}
        </time>
        <div
          ref={progressRef}
          onClick={progressHandler}
          className="w-full h-1 bg-gray-600 rounded cursor-pointer">
          <div
            className="relative h-full rounded bg-gradient-to-r from-blue-600 via-indigo-800 to-purple-900"
            style={{ width: `${percentage}%` }}>
            <div className="absolute right-0 w-3 h-3 bg-indigo-600 border-2 border-gray-100 rounded-full cursor-pointer -top-1"></div>
          </div>
        </div>
        <time className="font-medium text-gray-100">{trackDuration}</time>
      </div>

      <div className="flex items-center space-x-4">
        <button className="hidden xl:block" onClick={playerInfo.toggleLoop}>
          <i
            className={cx("text-gray-100 cursor-pointer fas fa-redo-alt", {
              "text-indigo-500": playerInfo.loop,
            })}></i>
        </button>
        <button onClick={playerInfo.goToPrevTrack}>
          <i className="text-gray-100 cursor-pointer fas fa-step-backward fa-lg"></i>
        </button>
        {actionButtonIcon}
        <button onClick={playerInfo.goToNextTrack}>
          <i className="text-gray-100 cursor-pointer fas fa-step-forward fa-lg"></i>
        </button>
        <button className="hidden xl:block" onClick={playerInfo.toggleShuffle}>
          <i
            className={cx("text-gray-100 cursor-pointer fas fa-random", {
              "text-indigo-500": playerInfo.isShuffled,
            })}></i>
        </button>
      </div>

      <div
        className="absolute left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-800 to-purple-900 xl:hidden bottom-2"
        style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

export default GlobalMusicPlayer;
