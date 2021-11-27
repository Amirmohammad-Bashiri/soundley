import Head from "next/head";
import { QueryClient, dehydrate } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

import GenresList from "@components/home-page/genres/genres-list";
import GridContainer from "@containers/home-page/grid-container";
import { getGenres } from "@lib/genres";
import { getTopArtists } from "@lib/artists";
import { getTopAlbums } from "@lib/albums";
import { getTopTracks } from "@lib/tracks";
import { deezerClient } from "../clients/deezer-client";
import ErrorFallback from "@components/error-fallback";

function HomePage() {
  return (
    <div>
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>

      <main>
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFallback
              resetErrorBoundary={resetErrorBoundary}
              queryKey="genres"
            />
          )}>
          <GenresList />
        </ErrorBoundary>
        <GridContainer />
      </main>
    </div>
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
  await queryClient.prefetchQuery(
    "artists",
    () => getTopArtists(deezerClient, "/chart/0/artists"),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
  await queryClient.prefetchQuery("albums", () =>
    getTopAlbums(deezerClient, "/chart/0/albums", {
      staleTime: 1000 * 60 * 60 * 24,
    })
  );
  await queryClient.prefetchQuery("tracks", () =>
    getTopTracks(deezerClient, "/chart/0/tracks", {
      staleTime: 1000 * 60 * 60 * 24,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

export default HomePage;
