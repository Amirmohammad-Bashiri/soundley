import { useMutation, useQueryClient } from "react-query";

import { likeTrack } from "@lib/like-track";

export function useLikeTrack() {
  const queryClient = useQueryClient();

  return useMutation(likeTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
}
