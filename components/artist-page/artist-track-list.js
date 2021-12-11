import ArtistTrackItem from "./artist-track-item";

function ArtistTrackList({ data, isLoading }) {
  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <ul
      style={{ maxHeight: "440px" }}
      className="w-full px-5 pt-2 pb-4 space-y-4 overflow-y-scroll bg-gray-800 divide-y-2 divide-gray-700 md:px-10">
      {data.data.map(track => (
        <ArtistTrackItem key={track.id} track={track} />
      ))}
    </ul>
  );
}

export default ArtistTrackList;
