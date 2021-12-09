import AlbumListItem from "./album-list-item";

function AlbumList({ data, isLoading }) {
  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <ul className="w-full px-10 py-2 space-y-4 overflow-y-scroll bg-gray-800 divide-y-2 divide-gray-700 max-h-96">
      {data.tracks.data.map(track => (
        <AlbumListItem key={track.id} track={track} />
      ))}
    </ul>
  );
}

export default AlbumList;
