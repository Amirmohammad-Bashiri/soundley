import { useQuery } from "react-query";

import { search } from "@lib/search";

export function useSearch(activeTab, searchTerm) {
  const { data, isLoading, isFetching } = useQuery(
    [activeTab, searchTerm],
    () => search(activeTab, searchTerm),
    { enabled: Boolean(searchTerm) }
  );

  return { data, isLoading, isFetching };
}
