import { useQuery } from "react-query";

import { getTopArtists } from "@lib/artists";

export function useArtists(client, url) {
  const { data, isLoading, isFetching } = useQuery(
    "artists",
    () => getTopArtists(client, url),
    {
      staleTime: 1000 * 60 * 60 * 24,
      useErrorBoundary: true,
    }
  );

  return { data, isLoading, isFetching };
}
