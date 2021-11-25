import { useQuery } from "react-query";

import { getGenres } from "@lib/genres";

export function useGenres(client, url) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    "genres",
    () => getGenres(client, url),
    {
      useErrorBoundary: true,
      retry: 1,
      // staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return { data, isLoading, isError, isFetching, refetch };
}
