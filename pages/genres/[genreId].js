import { useRouter } from "next/router";

function GenreItemPage() {
  const { query } = useRouter();

  return (
    <main>
      <h1 className="text-white">Genre ID: {query.genreId}</h1>
    </main>
  );
}

export default GenreItemPage;
