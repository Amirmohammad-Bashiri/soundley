import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";

import { getArtistTopTracks } from "@lib/artists";
import { deezerClient } from "@clients/deezer-client";
import { soundleyClient } from "@clients/soundley-client";
import { useArtist } from "@hooks/useArtist";

function ArtistPage() {
  const { query } = useRouter();

  const { data, isLoading } = useArtist(
    soundleyClient,
    `/artist/${query.artistId}`,
    query.artistId
  );

  console.log(data);

  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["artists", query.artistId],
    () => getArtistTopTracks(deezerClient, `/artist/${query.artistId}/top`),
    { staleTime: 1000 * 60 * 60 * 24 }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default ArtistPage;
