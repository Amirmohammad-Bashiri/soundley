import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { useUser } from "@hooks/useUser";
import PlaylistTracksList from "@components/playlist-page/playlist-tracks-list";
import PlaylistTracksHeader from "@components/playlist-page/playlist-tracks-header";
import NoPlaylistTracks from "@components/playlist-page/no-playlist-tracks";
import Loader from "@components/loader";

function PlaylistPage() {
  const { query } = useRouter();

  const { data, isLoading } = useUser();

  const playlist = data?.playlists.find(
    playlist => playlist.id === query.playlistId
  );

  const pageTitle =
    playlist && !isLoading
      ? `Soundley | ${playlist.name}`
      : "Soundley | Listen To What You Love";

  console.log(playlist);
  const tracks = playlist?.tracks;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main className="px-8 py-16 space-y-20 md:px-20">
        {isLoading ? (
          <div className="flex items-center min-h-[440px] justify-center">
            <Loader type="Oval" color="#D1D5DB" height={100} width={100} />
          </div>
        ) : (
          <>
            <PlaylistTracksHeader playlistName={playlist.name} />
            {tracks.length === 0 ? (
              <NoPlaylistTracks />
            ) : (
              <PlaylistTracksList
                tracks={tracks}
                playlistId={query.playlistId}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default PlaylistPage;
