import ArtistTrackItem from "./artist-track-item";
import Loader from "@components/loader";

function ArtistTrackList({ data, isFetching, artistId }) {
  return (
    <>
      {isFetching ? (
        <div
          style={{ minHeight: "440px" }}
          className="flex items-center justify-center w-full bg-gray-800">
          <Loader type="Oval" color="#D1D5DB" height={100} width={100} />
        </div>
      ) : (
        <ul
          style={{ maxHeight: "430px" }}
          className="w-full px-5 pt-2 pb-4 space-y-4 overflow-y-scroll bg-gray-800 divide-y-2 divide-gray-700 md:px-10">
          {data.data.map(track => (
            <ArtistTrackItem key={track.id} track={track} artistId={artistId} />
          ))}
        </ul>
      )}
    </>
  );
}

export default ArtistTrackList;
