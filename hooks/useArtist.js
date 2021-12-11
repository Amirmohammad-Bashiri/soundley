import { useQuery } from "react-query";

import { getArtistTopTracks } from "@lib/artists";

export function useArtist(client, url, artistId) {
  const { data, isLoading, isFetching } = useQuery(
    ["artists", artistId],
    () => getArtistTopTracks(client, url),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return { data, isLoading, isFetching };
}
