import { useMutation, useQueryClient } from "react-query";

import { createPlaylist } from "@lib/create-playlist";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation(createPlaylist, {
    onMutate: async data => {
      await queryClient.cancelQueries("user");
      const previousValue = queryClient.getQueryData("user");

      queryClient.setQueryData("user", old => {
        if (old.playlists) {
          return {
            ...old,
            playlists: [
              ...old.playlists,
              { id: Math.random() * 1000, name: data.playlistName, tracks: [] },
            ],
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
