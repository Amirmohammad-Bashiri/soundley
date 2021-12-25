import Loader from "@components/loader";
import TrackListItem from "./track-list-item";

function TrackList({ data, isFetching }) {
  return (
    <>
      {isFetching ? (
        <div className="flex items-center min-h-[440px] justify-center w-full bg-gray-800">
          <Loader type="Oval" color="#D1D5DB" height={100} width={100} />
        </div>
      ) : (
        <ul className="w-full px-5 py-2 space-y-4 bg-gray-800 md:px-10">
          <TrackListItem track={data} />
        </ul>
      )}
    </>
  );
}

export default TrackList;
