import Head from "next/head";

import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";
// import { prominent } from "color.js";

import { soundleyClient } from "@clients/soundley-client";
import { useAlbum } from "@hooks/useAlbum";
import { getAlbum } from "@lib/albums";
import { deezerClient } from "@clients/deezer-client";
import AlbumList from "@components/album-page/album-list";
import AlbumHeader from "@components/album-page/album-header";

function AlbumPage() {
  // const [prominentColor, setProminentColor] = useState([]);

  const { query } = useRouter();

  const { data, isLoading } = useAlbum(
    soundleyClient,
    `/album/${query.albumId}`,
    query.albumId
  );

  // if (data && data.cover_small) {
  //   prominent(data.cover_small, { amount: 1 }).then(color => {
  //     setProminentColor(color);
  //   });
  // }

  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>

      <main className="w-full">
        <section className="flex flex-col items-center justify-center px-20 py-16 space-y-20">
          <AlbumHeader data={data} />

          <AlbumList data={data} isLoading={isLoading} />
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
