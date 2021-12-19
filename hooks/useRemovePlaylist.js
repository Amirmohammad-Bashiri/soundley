import { useMutation, useQueryClient } from "react-query";

import { removePlaylist } from "@lib/remove-playlist";

export function useRemovePlaylist() {
  const queryClient = useQueryClient();

  return useMutation(removePlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
}
