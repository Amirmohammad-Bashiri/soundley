import { useEffect, useState } from "react";

import { useUser } from "@hooks/useUser";
import { isTrackLiked } from "@utils/is-track-liked";

export function useIsTrackLiked(currentTrack, trackId) {
  const [liked, setLiked] = useState(false);

  const { data } = useUser();

  useEffect(() => {
    if (data && !data.likes) return;
    if (trackId && data) {
      setLiked(isTrackLiked(currentTrack, data.likes));
    }
  }, [currentTrack, trackId, data, liked]);

  return { liked };
}
