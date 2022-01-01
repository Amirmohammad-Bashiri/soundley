import { useQuery } from "react-query";

import { getTopAlbums } from "@lib/albums";

export function useAlbums(client, url, inView) {
  const { data, isLoading, isFetching } = useQuery(
    "albums",
    () => getTopAlbums(client, url),
    {
      staleTime: 1000 * 60 * 60 * 24,
      useErrorBoundary: true,
      enabled: inView,
    }
  );

  return { data, isLoading, isFetching };
}
