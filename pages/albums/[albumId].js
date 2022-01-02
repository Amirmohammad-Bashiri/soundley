import Head from "next/head";

import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

import { soundleyClient } from "@clients/soundley-client";
import { useAlbum } from "@hooks/useAlbum";
import { getAlbum } from "@lib/albums";
import { deezerClient } from "@clients/deezer-client";
import AlbumList from "@components/album-page/album-list";
import AlbumHeader from "@components/album-page/album-header";
import ErrorFallback from "@components/error-fallback";

function AlbumPage() {
  const { query } = useRouter();

  const { data, isFetching } = useAlbum(
    soundleyClient,
    `/album/${query.albumId}`,
    query.albumId
  );

  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>

      <main className="w-full">
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-20 md:px-20">
          <ErrorBoundary
            fallbackRender={({ resetErrorBoundary }) => (
              <ErrorFallback
                resetErrorBoundary={resetErrorBoundary}
                queryKey={["albums", query.albumId]}
              />
            )}>
            <AlbumHeader data={data} />

            <AlbumList
              data={data}
              albumId={query.albumId}
              isFetching={isFetching}
            />
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["albums", query.albumId], () =>
    getAlbum(deezerClient, `/album/${query.albumId}`, {
      staleTime: 1000 * 60 * 60 * 24,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default AlbumPage;
