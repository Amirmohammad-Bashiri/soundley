import AlbumListItem from "./album-list-item";
import Loader from "@components/loader";

function AlbumList({ data, isFetching }) {
  return (
    <>
      {isFetching ? (
        <div className="flex items-center min-h-[440px] justify-center w-full bg-gray-800">
          <Loader type="Oval" color="#D1D5DB" height={100} width={100} />
        </div>
      ) : (
        <ul
          style={{ maxHeight: "440px" }}
          className="w-full px-5 py-2 space-y-4 overflow-y-scroll bg-gray-800 divide-y-2 divide-gray-700 md:px-10">
          {data.tracks.data.map(track => (
            <AlbumListItem key={track.id} track={track} />
          ))}
        </ul>
      )}
    </>
  );
}

export default AlbumList;
