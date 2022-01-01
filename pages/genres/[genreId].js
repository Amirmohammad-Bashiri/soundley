import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, dehydrate, useQueryClient } from "react-query";
import { deezerClient } from "@clients/deezer-client";
import { soundleyClient } from "@clients/soundley-client";

import { getGenreItem } from "@lib/genres";
import { useGenre } from "@hooks/useGenre";
import GenreArtistsList from "@components/genre-item-page/genre-artists-list";

function GenreItemPage() {
  const { query } = useRouter();

  const queryClient = useQueryClient();

  const genres = queryClient.getQueryData("genres");

  const genre = genres && genres.find(genre => genre.id === +query.genreId);

  const { data, isLoading } = useGenre(
    soundleyClient,
    `/genres/${query.genreId}`,
    query.genreId
  );

  const pageTitle = genre
    ? `Soundley | ${genre.name}`
    : "Soundley | Listen to What You Love";

  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main className="pb-6 mx-6 mt-10 xl:pb-10 md:mt-14">
        <GenreArtistsList artists={data.data} />
      </main>
    </>
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
