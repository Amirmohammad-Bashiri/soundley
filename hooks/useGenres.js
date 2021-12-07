import { useQuery } from "react-query";

import { getGenres } from "@lib/genres";

export function useGenres(client, url) {
  const { data, isLoading, isFetching } = useQuery(
    "genres",
    () => getGenres(client, url),
    {
      useErrorBoundary: true,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return { data, isLoading, isFetching };
}
