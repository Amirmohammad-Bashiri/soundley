import Head from "next/head";
import { QueryClient, dehydrate, useQueryClient } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

import GenresList from "@components/home-page/genres/genres-list";
import GridContainer from "@containers/home-page/grid-container";
import { getGenres } from "@lib/genres";
import { getTopArtists } from "@lib/artists";
import { deezerClient } from "../clients/deezer-client";

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <div className="flex items-center justify-center pt-4 pb-6 mx-6 mt-10 bg-gray-800 rounded h-52 md:mt-14 md:mx-10">
      <div className="flex flex-col items-center justify-center space-y-8 text-gray-50">
        <p className="text-2xl font-medium tracking-wide">
          Something went wrong
        </p>
        <button
          className="px-4 py-2 font-semibold bg-indigo-500 rounded active:bg-indigo-400"
          onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  const queryClient = useQueryClient();

  return (
    <div>
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>

      <main>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => queryClient.invalidateQueries("genres")}>
          <GenresList />
        </ErrorBoundary>
        {/* <GridContainer /> */}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("genres", () =>
    getGenres(deezerClient, "/genre")
  );
  await queryClient.prefetchQuery("artists", getTopArtists, {
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

export default HomePage;
