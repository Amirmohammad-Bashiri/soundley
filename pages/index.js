import Head from "next/head";

import GenresList from "@components/home-page/genres/genresList";

function HomePage() {
  return (
    <div>
      <Head>
        <title>Soundley | Listen to Music</title>
      </Head>

      <main>
        <GenresList />
      </main>
    </div>
  );
}

export default HomePage;
