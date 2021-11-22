import { useQuery } from "react-query";

import { getGenres } from "@lib/genres";

export function useGenres() {
  const { data, isLoading, isError } = useQuery("genres", getGenres, {
    staleTime: 1000 * 60 * 60 * 24,
  });

  return [data, isLoading, isError];
}
