import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import cx from "clsx";
import {
  PlayIcon,
  PlusIcon,
  PauseIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";

import { getTrackLength } from "@utils/get-track-length";
import { usePlayer } from "@store/player-context";
import { useLikeTrack } from "@hooks/useLikeTrack";
import { useDislikeTrack } from "@hooks/useDislikeTrack";
import { useUser } from "@hooks/useUser";
import { isTrackLiked } from "@utils/is-track-liked";
import { usePlaylistPopup } from "@store/playlist-popup-context";

function TopTrackItem({ track }) {
  const [liked, setLiked] = useState(false);

  const { push } = useRouter();

  const { status } = useSession();

  const { isPlaying, trackId, findTrackIndex } = usePlayer();

  const { togglePlaylistPopup, selectTrackForPlaylist } = usePlaylistPopup();

  const isThisTrackBeingPlayed = isPlaying && trackId === track.id;

  const actionButtonIcon = isThisTrackBeingPlayed ? (
    <PauseIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-6 xl:w-6" />
  ) : (
    <PlayIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-6 xl:w-6" />
  );

  const { data } = useUser();

  useEffect(() => {
    if (data && !data.likes) return;
    if (track && data) {
      setLiked(isTrackLiked(track, data.likes));
    }
  }, [track, data]);

  const likeMutation = useLikeTrack();
  const dislikeMutation = useDislikeTrack();

  const handleLike = () => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
    }

    likeMutation.mutate(track);
  };

  const handleDislike = () => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
    }

    dislikeMutation.mutate(track.id);
  };

  const handlePlaylistPopup = () => {
    if (status === "unauthenticated") {
      push("/api/auth/signin");
      return;
    }

    selectTrackForPlaylist(track);
    togglePlaylistPopup();
  };

  const handlePlayClick = () => {
    findTrackIndex(track.id, "topTracks");
  };

  return (
    <li className="flex items-center justify-between space-x-1 md:space-x-3">
      <div className="flex items-center space-x-5">
        <div className="relative w-16 h-16 min-h-[4rem] min-w-[4rem]">
          <Image
            src={track.album.cover_medium}
            alt={track.title}
            layout="fill"
            objectFit="contain"
            className="rounded"
          />
          <div className="absolute top-0 left-0 w-16 h-16 rounded opacity-20 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <strong
            className={cx("text-sm text-gray-100 line-clamp-1 md:text-lg", {
              "text-indigo-400": trackId === track.id,
            })}>
            {track.title}
          </strong>
          <Link href={`/artists/${track.artist.id}`}>
            <a className="text-xs text-gray-300 md:text-sm line-clamp-1">
              {track.artist.name}
            </a>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 md:space-x-6">
        <time className="text-sm font-semibold text-gray-200 md:text-base">
          {getTrackLength(track.duration)}
        </time>
        <button
          onClick={handlePlayClick}
          className={cx("p-1 bg-gray-800 border border-gray-400 rounded", {
            "border-indigo-400": isThisTrackBeingPlayed,
          })}>
          {actionButtonIcon}
        </button>
        <button
          onClick={handlePlaylistPopup}
          className="hidden bg-gray-500 rounded md:block">
          <PlusIcon className="w-4 h-4 cursor-pointer xl:h-5 xl:w-5" />
        </button>
        {liked ? (
          <button onClick={handleDislike}>
            <HeartIconSolid className="w-6 h-6 text-indigo-500 cursor-pointer md:w-7 md:h-7" />
          </button>
        ) : (
          <button onClick={handleLike}>
            <HeartIconOutline className="w-6 h-6 text-gray-100 cursor-pointer md:w-7 md:h-7" />
          </button>
        )}
      </div>
    </li>
  );
}

export default TopTrackItem;
