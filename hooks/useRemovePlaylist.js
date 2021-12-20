import { useMutation, useQueryClient } from "react-query";

import { removePlaylist } from "@lib/remove-playlist";

export function useRemovePlaylist() {
  const queryClient = useQueryClient();

  return useMutation(removePlaylist, {
    onMutate: async data => {
      await queryClient.cancelQueries("user");
      const previousValue = queryClient.getQueryData("user");

      queryClient.setQueryData("user", old => {
        if (old.playlists) {
          return {
            ...old,
            playlists: old.playlists.filter(
              playlist => playlist.id !== data.playlistId
            ),
          };
        }
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData("user", previousValue),
    onSettled: () => {
      queryClient.invalidateQueries("user");
    },
  });
}
