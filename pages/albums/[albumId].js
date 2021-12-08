import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";
import { PlayIcon, PlusIcon, PauseIcon } from "@heroicons/react/solid";

import { useAlbum } from "@hooks/useAlbum";
import { getAlbum } from "@lib/albums";
import { deezerClient } from "@clients/deezer-client";
import { soundleyClient } from "@clients/soundley-client";
import { usePlayer } from "@store/player-context";

function AlbumPage() {
  const { query } = useRouter();

  const { isPlaying, trackId, findTrackIndex, setAlbumId } = usePlayer();

  const actionButtonIcon = (
    <PlayIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-6 xl:w-6" />
  );

  const handlePlayClick = track => {
    findTrackIndex(track.id, "album");
  };

  const { data, isLoading } = useAlbum(
    soundleyClient,
    `/album/${query.albumId}`,
    query.albumId
  );

  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <div>
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>

      <main>
        <section className="flex flex-col w-full bg-gray-500 h-96">
          {data.tracks.data.map(track => (
            <div key={track.id} className="flex justify-around">
              <p>{track.title}</p>
              <button onClick={() => handlePlayClick(track)}>
                {actionButtonIcon}
              </button>
            </div>
          ))}

          <div className="flex justify-around">
            <p>title</p>
            <button>play</button>
          </div>
          <div className="flex justify-around">
            <p>title</p>
            <button>play</button>
          </div>
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

// export async function getStaticPaths() {}

export default AlbumPage;
