import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";
import { deezerClient } from "@clients/deezer-client";
import { soundleyClient } from "@clients/soundley-client";

import { getGenreItem } from "@lib/genres";
import { useGenre } from "@hooks/useGenre";

function GenreItemPage() {
  const { query } = useRouter();

  const { data, isLoading } = useGenre(
    soundleyClient,
    `/genres/${query.genreId}`,
    query.genreId
  );

  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <main>
      <h1 className="text-white">Genre ID: {query.genreId}</h1>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["genres", query.genreId],
    () => getGenreItem(deezerClient, `/genre/${query.genreId}/artists`),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default GenreItemPage;
