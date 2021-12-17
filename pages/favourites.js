import { getSession } from "next-auth/react";

import { useUser } from "@hooks/useUser";
import FavouritesList from "@components/favourites-page/favourites-list";
import FavouritesHeader from "@components/favourites-page/favourites-header";
import NoFavourites from "@components/favourites-page/no-favourites";

function FavouritesPage() {
  const { data, isLoading } = useUser();

  if (isLoading) return <h1 className="text-white">Loading...</h1>;

  return (
    <main className="pb-6 mx-6 mt-10 space-y-16 md:space-y-20 xl:pb-10 md:mx-12 md:mt-16">
      <FavouritesHeader />

      {!data.likes || data.likes.length === 0 ? (
        <NoFavourites />
      ) : (
        <FavouritesList data={data} />
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

export default FavouritesPage;
