import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ChevronDownIcon,
  CollectionIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";

import { useMusicPlayerPopup } from "@store/music-player-popup-context";
import { usePlayer } from "@store/player-context";
import { updateProgress } from "@utils/update-progress";
import { convertTrackCurrentTime } from "@utils/convert-track-current-time";
import { useLikeTrack } from "@hooks/useLikeTrack";
import { useDislikeTrack } from "@hooks/useDislikeTrack";
import { useIsTrackLiked } from "@hooks/useIsTrackLiked";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 50,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function MusicPlayerPopup() {
  const progressRef = useRef();

  const { push } = useRouter();

  const { togglePopup } = useMusicPlayerPopup();

  const playerInfo = usePlayer();

  const { liked } = useIsTrackLiked(
    playerInfo.currentTrack,
    playerInfo.trackId
  );

  const { status } = useSession();

  const likeMutation = useLikeTrack();
  const dislikeMutation = useDislikeTrack();

  const handleLike = () => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
    }

    if (!playerInfo.trackId) return;

    likeMutation.mutate(playerInfo.currentTrack);
  };

  const handleDislike = () => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
    }

    if (!playerInfo.trackId) return;

    dislikeMutation.mutate(playerInfo.trackId);
  };

  const progressHandler = e => {
    updateProgress(e, progressRef, playerInfo.audio);
  };

  const percentage =
    playerInfo.audio && playerInfo.currentTime
      ? (playerInfo.currentTime / playerInfo.audio.duration) * 100
      : 0;

  const trackDuration =
    playerInfo.audio && playerInfo.audio.duration
      ? convertTrackCurrentTime(playerInfo.audio.duration)
      : "0:00";

  const loopClass = !playerInfo.loop
    ? "text-gray-100 cursor-pointer fas fa-redo-alt fa-lg"
    : "text-indigo-500 cursor-pointer fas fa-redo-alt fa-lg";

  const actionButtonIcon = playerInfo.isPlaying ? (
    <button onClick={playerInfo.pause}>
      <i className="p-4 text-gray-100 bg-indigo-500 rounded cursor-pointer fas fa-pause fa-lg"></i>
    </button>
  ) : (
    <button onClick={playerInfo.play}>
      <i className="p-4 text-gray-100 bg-indigo-500 rounded cursor-pointer fas fa-play fa-lg"></i>
    </button>
  );

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-0 left-0 z-50 w-full h-full text-center bg-gray-900">
      <div className="flex items-center justify-between px-5 pt-4 text-gray-200 md:pt-8">
        <button onClick={togglePopup}>
          <ChevronDownIcon className="w-8 h-8 md:w-14 md:h-14" />
        </button>
        <button>
          <CollectionIcon className="w-7 h-7 md:w-12 md:h-12" />
        </button>
      </div>

      {/* Track image */}
      <div className="flex flex-col items-center justify-center xs:mt-10 sm:mt-16 ">
        <div className="relative rounded w-52 h-52 sm:w-80 sm:h-80 md:w-96 md:h-96">
          {playerInfo.currentTrack.album ? (
            <Image
              src={playerInfo.currentTrack?.album?.cover_medium}
              alt="Track Cover"
              layout="fill"
              className="rounded"
            />
          ) : playerInfo.trackCover ? (
            <Image
              src={playerInfo?.trackCover}
              alt="Track Cover"
              layout="fill"
              className="rounded"
            />
          ) : null}
          <div className="absolute w-full h-full opacity-25 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
        </div>

        {/* Track info*/}
        <div className="flex flex-col items-center justify-center px-6 mt-5">
          <h1 className="text-2xl font-semibold md:text-4xl line-clamp-1 text-gray-50">
            {playerInfo?.currentTrack.title
              ? playerInfo?.currentTrack.title
              : "Song Title"}
          </h1>
          <Link href={`/artists/${playerInfo?.currentTrack?.artist?.id}`}>
            <a className="text-base font-medium text-gray-300 md:text-xl line-clamp-1">
              {playerInfo?.currentTrack.artist
                ? playerInfo?.currentTrack.artist.name
                : "Artist Name"}
            </a>
          </Link>
        </div>

        <div className="absolute bottom-0 flex flex-col w-full pb-5 space-y-5 bg-gray-800">
          {/* Track percentage */}
          <div className="flex items-center w-full px-4 mt-6 space-x-6">
            <time className="flex-grow-0 flex-shrink-0 font-medium text-gray-100 md:text-lg">
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
            <time className="font-medium text-gray-100 md:text-lg">
              {trackDuration}
            </time>
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center ">
            <div className="flex items-center justify-center space-x-8">
              <button onClick={playerInfo.toggleLoop}>
                <i className={loopClass}></i>
              </button>
              <button onClick={playerInfo.goToPrevTrack}>
                <i className="text-gray-100 cursor-pointer fas fa-step-backward fa-lg"></i>
              </button>
              {actionButtonIcon}
              <button onClick={playerInfo.goToNextTrack}>
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
        </div>
      </div>
    </motion.div>
  );
}

export default MusicPlayerPopup;
