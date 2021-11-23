import { useQuery } from "react-query";

import { getTopArtists } from "@lib/artists";

export function useArtists() {
  const { data, isLoading, isError } = useQuery("artists", getTopArtists, {
    staleTime: 1000 * 60 * 60 * 24,
  });

  return [data, isLoading, isError];
}
