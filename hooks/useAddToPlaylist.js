import { useMutation, useQueryClient } from "react-query";

import { addToPlaylist } from "@lib/addToPlaylist";

export function useAddToPlaylist() {
  const queryClient = useQueryClient();

  return useMutation(addToPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
}
