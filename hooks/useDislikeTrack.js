import { useMutation, useQueryClient } from "react-query";

import { dislikeTrack } from "@lib/dislike-track";

export function useDislikeTrack() {
  const queryClient = useQueryClient();

  return useMutation(dislikeTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
}
