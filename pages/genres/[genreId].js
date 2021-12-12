import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";
import { deezerClient } from "@clients/deezer-client";

import { getGenreItem } from "@lib/genres";

function GenreItemPage() {
  const { query } = useRouter();

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
