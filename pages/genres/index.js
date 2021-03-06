import Head from "next/head";
import { QueryClient, dehydrate } from "react-query";

import { getGenres } from "@lib/genres";
import { deezerClient } from "@clients/deezer-client";
import { soundleyClient } from "@clients/soundley-client";
import { useGenres } from "@hooks/useGenres";
import GenresList from "@components/genres-page/genres-list";

function GenresPage() {
  const { data } = useGenres(soundleyClient, "/genres");

  return (
    <>
      <Head>
        <title>Soundley | Genres</title>
      </Head>

      <main className="pb-6 mt-10 md:mx-6 xl:pb-10 md:mt-14">
        <GenresList data={data} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    "genres",
    () => getGenres(deezerClient, "/genre"),
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

export default GenresPage;
