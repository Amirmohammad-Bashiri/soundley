import { getSession } from "next-auth/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@components/error-fallback";

import { useUser } from "@hooks/useUser";
import FavouritesList from "@components/favourites-page/favourites-list";
import FavouritesHeader from "@components/favourites-page/favourites-header";
import NoFavourites from "@components/favourites-page/no-favourites";
import Loader from "@components/loader";

function FavouritesPage() {
  const { data, isLoading } = useUser();

  return (
    <main className="pb-6 mx-6 mt-10 space-y-16 md:space-y-20 xl:pb-10 md:mx-12 md:mt-16">
      <FavouritesHeader />

      {isLoading ? (
        <div className="flex min-h-[440px] items-center justify-center w-full bg-gray-800 rounded-sm">
          <Loader type="Oval" color="#D1D5DB" height={100} width={100} />
        </div>
      ) : (
        <>
          {!data.likes || data.likes.length === 0 ? (
            <NoFavourites />
          ) : (
            <ErrorBoundary
              fallbackRender={({ resetErrorBoundary }) => (
                <ErrorFallback
                  resetErrorBoundary={resetErrorBoundary}
                  queryKey={["user"]}
                />
              )}>
              <FavouritesList data={data} />
            </ErrorBoundary>
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

export default FavouritesPage;
