import Head from "next/head";
import { QueryClient, dehydrate } from "react-query";

import GenresList from "@components/home-page/genres/genres-list";
import GridContainer from "@containers/home-page/grid-container";
import { getGenres } from "@lib/genres";

function HomePage() {
  return (
    <div>
      <Head>
        <title>Soundley | Listen to What You Love</title>
      </Head>

      <main>
        <GenresList />
        <GridContainer />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("genres", getGenres);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

export default HomePage;
