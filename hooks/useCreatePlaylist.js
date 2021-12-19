import { useMutation, useQueryClient } from "react-query";

import { createPlaylist } from "@lib/create-playlist";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation(createPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
}
