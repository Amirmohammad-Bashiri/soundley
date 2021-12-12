import { useQuery } from "react-query";

import { getGenreItem } from "@lib/genres";

export function useGenre(client, url, genreId) {
  const { data, isLoading, isFetching } = useQuery(
    ["genres", genreId],
    () => getGenreItem(client, url),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return { data, isLoading, isFetching };
}
