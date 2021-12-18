import { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  ViewGridAddIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";

import { usePlayer } from "@store/player-context";
import { convertTrackCurrentTime } from "@utils/convert-track-current-time";
import { updateProgress } from "@utils/update-progress";
import { useLikeTrack } from "@hooks/useLikeTrack";
import { useDislikeTrack } from "@hooks/useDislikeTrack";
import { useIsTrackLiked } from "@hooks/useIsTrackLiked";
import { usePlaylistPopup } from "@store/playlist-popup-contenxt";

function DesktopPlayer() {
  const progressRef = useRef();

  const { togglePopup } = usePlaylistPopup();

  const {
    goToNextTrack,
    goToPrevTrack,
    pause,
    play,
    isPlaying,
    toggleLoop,
    loop,
    currentTrack,
    currentTime,
    audio,
    trackCover,
    trackId,
  } = usePlayer();

  const { push } = useRouter();

  const { status } = useSession();

  const { liked } = useIsTrackLiked(currentTrack, trackId);

  const likeMutation = useLikeTrack();
  const dislikeMutation = useDislikeTrack();

  const handleLike = () => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
      return;
    }

    if (!trackId) return;

    likeMutation.mutate(currentTrack);
  };

  const handleDislike = () => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
      return;
    }

    if (!trackId) return;

    dislikeMutation.mutate(trackId);
  };

  const progressHandler = e => {
    updateProgress(e, progressRef, audio);
  };

  const handlePlaylistPopup = () => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
      return;
    }

    togglePopup();
  };

  const trackDuration =
    audio && audio.duration ? convertTrackCurrentTime(audio.duration) : "0:00";

  const percentage =
    audio && currentTime ? (currentTime / audio.duration) * 100 : 0;

  const actionButtonIcon = isPlaying ? (
    <button onClick={pause}>
      <i className="p-4 text-gray-100 bg-indigo-500 rounded cursor-pointer fas fa-pause fa-lg"></i>
    </button>
  ) : (
    <button onClick={play}>
      <i className="p-4 text-gray-100 bg-indigo-500 rounded cursor-pointer fas fa-play fa-lg"></i>
    </button>
  );

  const loopClass = !loop
    ? "text-gray-100 cursor-pointer fas fa-redo-alt fa-lg"
    : "text-indigo-500 cursor-pointer fas fa-redo-alt fa-lg";

  return (
    <>
      <div className="hidden px-6 2xl:items-center 2xl:justify-between 2xl:flex text-gray-50">
        <h2 className="text-xl font-semibold">Player</h2>
        <button onClick={handlePlaylistPopup}>
          <ViewGridAddIcon className="w-5 h-5 cursor-pointer xl:h-6 xl:w-6" />
        </button>
      </div>

      <div className="flex items-center justify-center px-16 mt-4 2xl:mt-10">
        <div className="relative w-24 h-24 rounded 2xl:w-full 2xl:h-80">
          {currentTrack.album ? (
            <Image
              src={currentTrack?.album?.cover_medium}
              alt="Track Cover"
              layout="fill"
              className="rounded"
            />
          ) : trackCover ? (
            <Image
              src={trackCover}
              alt="Track Cover"
              layout="fill"
              className="rounded"
            />
          ) : null}
          <div className="absolute top-0 left-0 w-24 h-24 rounded opacity-25 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800 2xl:w-full 2xl:h-80"></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 mt-5 2xl:space-y-2">
        <h1 className="text-xl font-semibold 2xl:text-2xl line-clamp-1 text-gray-50">
          {currentTrack.title ? currentTrack.title : "Song Title"}
        </h1>
        <Link href={`/artists/${currentTrack?.artist?.id}`}>
          <a className="text-base text-gray-300 2xl:text-lg line-clamp-1">
            {currentTrack.artist ? currentTrack.artist.name : "Artist Name"}
          </a>
        </Link>
      </div>

      <div className="flex items-center px-6 mt-4 space-x-6">
        <time className="flex-grow-0 flex-shrink-0 font-medium text-gray-100">
          {convertTrackCurrentTime(currentTime)}
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

      <div className="mt-4 2xl:mt-10">
        <div className="flex items-center justify-center space-x-8">
          <button onClick={toggleLoop}>
            <i className={loopClass}></i>
          </button>
          <button onClick={goToPrevTrack}>
            <i className="text-gray-100 cursor-pointer fas fa-step-backward fa-lg"></i>
          </button>
          {actionButtonIcon}
          <button onClick={goToNextTrack}>
            <i className="text-gray-100 cursor-pointer fas fa-step-forward fa-lg"></i>
          </button>

          {liked ? (
            <button onClick={handleDislike}>
              <HeartIconSolid className="w-8 h-8 text-indigo-500 cursor-pointer" />
            </button>
          ) : (
            <button onClick={handleLike}>
              <HeartIconOutline className="w-8 h-8 text-gray-100 cursor-pointer" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default DesktopPlayer;
