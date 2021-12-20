import { getSession } from "next-auth/react";

import { useUser } from "@hooks/useUser";
import PlaylistsHeader from "@components/playlists-page/playlists-header";
import Loader from "@components/loader";
import NoPlaylists from "@components/playlist/no-playlists";
import Playlists from "@components/playlists-page/playlists";

function PlaylistsPage() {
  const { data, isLoading, isFetching } = useUser();

  return (
    <main className="pb-6 mx-6 mt-10 space-y-16 md:space-y-24 xl:pb-10 md:mx-12 md:mt-12">
      <PlaylistsHeader />

      {isLoading ? (
        <div className="flex items-center min-h-[440px] justify-center">
          <Loader type="Oval" color="#D1D5DB" height={100} width={100} />
        </div>
      ) : (
        <>
          {!data.playlists || data.playlists.length === 0 ? (
            <NoPlaylists />
          ) : (
            <Playlists data={data} />
          )}
        </>
      )}
    </main>
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

export default PlaylistsPage;
