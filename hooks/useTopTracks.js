import { useQuery } from "react-query";

import { getTopTracks } from "@lib/tracks";

export function useGenres(client, url) {
  const { data, isLoading, isFetching } = useQuery(
    "tracks",
    () => getTopTracks(client, url),
    {
      useErrorBoundary: true,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return { data, isLoading, isFetching };
}
