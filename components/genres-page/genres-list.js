import GenresListItem from "./genres-list-item";

function GenresList({ data }) {
  return (
    <ul className="flex flex-wrap items-center justify-center md:justify-start md:gap-x-5 gap-y-10">
      {data.map(genre => (
        <GenresListItem key={genre.id} genre={genre} />
      ))}
    </ul>
  );
}

export default GenresList;
