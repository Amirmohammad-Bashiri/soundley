import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";

import { getUser } from "@lib/get-user";
import { useUser } from "@hooks/useUser";
import PlaylistTracksList from "@components/playlist-page/playlist-tracks-list";

function PlaylistPage() {
  const { query } = useRouter();

  const { data, isLoading } = useUser();

  const tracks = data?.playlists.find(
    playlist => playlist.id === query.playlistId
  ).tracks;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <main>
      <PlaylistTracksList tracks={tracks} />
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
