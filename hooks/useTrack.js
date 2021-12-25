import { useQuery } from "react-query";

import { getTrack } from "@lib/track";

export function useTrack(client, url, trackId) {
  const { data, isLoading, isFetching } = useQuery(
    ["tracks", trackId],
    () => getTrack(client, url),
    {
      staleTime: 1000 * 60 * 60 * 24,
      useErrorBoundary: true,
    }
  );

  return { data, isLoading, isFetching };
}
