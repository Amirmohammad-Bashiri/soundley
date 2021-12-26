import GenresListItem from "./genres-list-item";

function GenresList({ data }) {
  return (
    <ul className="flex flex-col items-center justify-center md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-x-6 xl:gap-x-8 gap-y-10">
      {data.map(genre => (
        <GenresListItem key={genre.id} genre={genre} />
      ))}
    </ul>
  );
}

export default GenresList;
