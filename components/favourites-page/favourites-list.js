import FavouritesListItem from "./favourites-list-item";

function FavouritesList({ data }) {
  return (
    <ul className="w-full px-5 pt-3 pb-5 max-h-[440px] space-y-4 overflow-y-scroll bg-gray-800 divide-y-2 divide-gray-700 rounded-sm md:px-10">
      {data.likes.map(track => (
        <FavouritesListItem key={track.id} track={track} />
      ))}
    </ul>
  );
}

export default FavouritesList;
