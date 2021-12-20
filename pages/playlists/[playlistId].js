import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";

import { getUser } from "@lib/get-user";
import { useUser } from "@hooks/useUser";
import PlaylistTracksList from "@components/playlist-page/playlist-tracks-list";
import PlaylistTracksHeader from "@components/playlist-page/playlist-tracks-header";
import NoPlaylistTracks from "@components/playlist-page/no-playlist-tracks";

function PlaylistPage() {
  const { query } = useRouter();

  const { data, isLoading } = useUser();

  const playlist = data?.playlists.find(
    playlist => playlist.id === query.playlistId
  );

  const tracks = playlist?.tracks;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <main className="px-8 py-16 space-y-20 md:px-20">
      <PlaylistTracksHeader playlistName={playlist.name} />
      {tracks.length === 0 ? (
        <NoPlaylistTracks />
      ) : (
        <PlaylistTracksList tracks={tracks} />
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("user", getUser(), {
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default PlaylistPage;
