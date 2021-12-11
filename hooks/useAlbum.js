import { useQuery } from "react-query";

import { getAlbum } from "@lib/albums";

export function useAlbum(client, url, albumId) {
  const { data, isLoading, isFetching } = useQuery(
    ["albums", albumId],
    () => getAlbum(client, url),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return { data, isLoading, isFetching };
}
