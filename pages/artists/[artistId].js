import Head from "next/head";

import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";

import { getArtistTopTracks } from "@lib/artists";
import { deezerClient } from "@clients/deezer-client";
import { soundleyClient } from "@clients/soundley-client";
import { useArtist } from "@hooks/useArtist";
import ArtistHeader from "@components/artist-page/artist-header";
import ArtistTrackList from "@components/artist-page/artist-track-list";

function ArtistPage() {
  const { query } = useRouter();

  const { data, isLoading } = useArtist(
    soundleyClient,
    `/artist/${query.artistId}`,
    query.artistId
  );

  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>

      <main className="w-full">
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-20 md:px-20">
          <ArtistHeader data={data} />
          <ArtistTrackList data={data} isLoading={isLoading} />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["artists", query.artistId],
    () =>
      getArtistTopTracks(
        deezerClient,
        `/artist/${query.artistId}/top?limit=10`
      ),
    { staleTime: 1000 * 60 * 60 * 24 }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default ArtistPage;
