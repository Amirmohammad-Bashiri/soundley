import { useMutation, useQueryClient } from "react-query";

import { dislikeTrack } from "@lib/dislike-track";

export function useDislikeTrack() {
  const queryClient = useQueryClient();

  return useMutation(dislikeTrack, {
    onMutate: async trackId => {
      await queryClient.cancelQueries("user");
      const previousValue = queryClient.getQueriesData("user");

      queryClient.setQueryData("user", old => ({
        ...old,
        likes: old.likes.filter(track => track.id !== trackId),
      }));

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData("user", previousValue),
    onSettled: () => {
      queryClient.invalidateQueries("user");
    },
  });
}
