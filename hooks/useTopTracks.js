import { useQuery } from "react-query";

import { getTopTracks } from "@lib/top-tracks";

function getTracksWithPreviews(tracks) {
  return tracks.filter(track => track.preview);
}

export function useTopTracks(client, url) {
  const { data, isLoading, isFetching } = useQuery(
    "topTracks",
    () => getTopTracks(client, url),
    {
      useErrorBoundary: true,
      staleTime: 1000 * 60 * 60 * 24,
      select: getTracksWithPreviews,
    }
  );

  return { data, isLoading, isFetching };
}
