import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";

import { getTrack } from "@lib/track";
import { soundleyClient } from "@clients/soundley-client";
import { deezerClient } from "@clients/deezer-client";
import { useTrack } from "@hooks/useTrack";
import TrackHeader from "@components/track-page/track-header";

function TrackPage() {
  const { query } = useRouter();

  const { data, isFetching } = useTrack(
    soundleyClient,
    `/track/${query.trackId}`,
    query.trackId
  );

  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>

      <main className="w-full">
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-20 md:px-20">
          <TrackHeader data={data} />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["tracks", query.trackId], () =>
    getTrack(deezerClient, `/track/${query.trackId}`, {
      staleTime: 1000 * 60 * 60 * 24,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default TrackPage;
