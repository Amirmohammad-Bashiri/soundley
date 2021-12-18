import { useQuery } from "react-query";

import { getUser } from "@lib/get-user";

export function useUser() {
  const { data, isLoading, isFetching } = useQuery("user", getUser, {
    staleTime: 1000 * 60 * 60 * 24 * 7,
    useErrorBoundary: true,
  });

  return { data, isLoading, isFetching };
}
