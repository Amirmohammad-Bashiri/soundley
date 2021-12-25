import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  PlayIcon,
  PlusIcon,
  PauseIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";
import cx from "clsx";
import { useSession } from "next-auth/react";

import { usePlayer } from "@store/player-context";
import { getTrackLength } from "@utils/get-track-length";
import { useLikeTrack } from "@hooks/useLikeTrack";
import { useDislikeTrack } from "@hooks/useDislikeTrack";
import { useUser } from "@hooks/useUser";
import { isTrackLiked } from "@utils/is-track-liked";
import { usePlaylistPopup } from "@store/playlist-popup-contenxt";

function TrackListItem({ track }) {
  const [liked, setLiked] = useState(false);

  const { push } = useRouter();

  const { status } = useSession();

  const { isPlaying, trackId, findTrackIndex } = usePlayer();

  const { togglePlaylistPopup, selectTrackForPlaylist } = usePlaylistPopup();

  const isThisTrackBeingPlayed = isPlaying && trackId === track.id;

  const actionButtonIcon = isThisTrackBeingPlayed ? (
    <PauseIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-7 xl:w-7" />
  ) : (
    <PlayIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-7 xl:w-7" />
  );

  const { data } = useUser();

  useEffect(() => {
    if (track && data && data.likes) {
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

  const handlePlayClick = track => {
    findTrackIndex(track.id, "track");
  };

  return (
    <li className="flex items-center justify-between py-4 space-x-1 text-gray-100">
      <strong
        onClick={() => handlePlayClick(track)}
        className={cx("text-sm cursor-pointer md:text-lg line-clamp-1", {
          "text-indigo-500": isThisTrackBeingPlayed,
        })}>
        {track.title}
      </strong>
      <div className="flex items-center space-x-3 md:space-x-5">
        <time className="text-sm font-semibold text-gray-200 md:text-base xl:text-lg">
          {getTrackLength(track.duration)}
        </time>
        <button onClick={() => handlePlayClick(track)}>
          {actionButtonIcon}
        </button>
        <button onClick={handlePlaylistPopup} className="bg-gray-500 rounded">
          <PlusIcon className="w-4 h-4 cursor-pointer xl:h-6 xl:w-6" />
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

export default TrackListItem;
