import { useMutation, useQueryClient } from "react-query";

import { removeFromPlaylist } from "@lib/removeFromPlaylist";

export function useRemoveFromPlaylist() {
  const queryClient = useQueryClient();

  return useMutation(removeFromPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
}
