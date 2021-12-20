import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  PlayIcon,
  PauseIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";
import cx from "clsx";

import { usePlayer } from "@store/player-context";
import { getTrackLength } from "@utils/get-track-length";
import { useLikeTrack } from "@hooks/useLikeTrack";
import { useDislikeTrack } from "@hooks/useDislikeTrack";
import { useUser } from "@hooks/useUser";
import { isTrackLiked } from "@utils/is-track-liked";

function PlaylistTracksItem({ track }) {
  const [liked, setLiked] = useState(false);

  const { query } = useRouter();

  const { isPlaying, trackId, findTrackIndex } = usePlayer();

  const isThisTrackBeingPlayed = isPlaying && trackId === track.id;

  const actionButtonIcon = isThisTrackBeingPlayed ? (
    <PauseIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-7 xl:w-7" />
  ) : (
    <PlayIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-7 xl:w-7" />
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
    likeMutation.mutate(track);
  };

  const handleDislike = () => {
    dislikeMutation.mutate(track.id);
  };

  const handlePlayClick = track => {
    findTrackIndex(track.id, "playlists", query.playlistId);
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

export default PlaylistTracksItem;
