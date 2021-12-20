import { getSession } from "next-auth/react";

import { useUser } from "@hooks/useUser";
import PlaylistsHeader from "@components/playlists-page/playlists-header";

function PlaylistsPage() {
  const { data, isLoading, isFetching } = useUser();

  return (
    <main className="pb-6 mx-6 mt-10 space-y-16 md:space-y-20 xl:pb-10 md:mx-12 md:mt-16">
      <PlaylistsHeader />
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
