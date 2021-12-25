import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";

import { getTrack } from "@lib/track";
import { soundleyClient } from "@clients/soundley-client";
import { deezerClient } from "@clients/deezer-client";
import { useTrack } from "@hooks/useTrack";

function TrackPage() {
  const { query } = useRouter();

  const { data, isFetching } = useTrack(
    soundleyClient,
    `/track/${query.trackId}`,
    query.trackId
  );

  return <div>Boop</div>;
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
