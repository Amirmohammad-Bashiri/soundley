import { useMutation, useQueryClient } from "react-query";

import { likeTrack } from "@lib/like-track";

export function useLikeTrack() {
  const queryClient = useQueryClient();

  return useMutation(likeTrack, {
    onMutate: async track => {
      await queryClient.cancelQueries("user");
      const previousValue = queryClient.getQueryData("user");

      queryClient.setQueryData("user", old => ({
        ...old,
        likes: [...old.likes, track],
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
