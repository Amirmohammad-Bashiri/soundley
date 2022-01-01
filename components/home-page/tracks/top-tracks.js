import TopTrackItem from "./top-track-item";
import Loader from "@components/loader";
import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";

function TopTracks({ inView }) {
  const { data, isFetching, isLoading } = useTopTracks(
    soundleyClient,
    "/tracks",
    inView
  );

  if (isFetching || isLoading) {
    return (
      <div className="flex items-center justify-center pb-24 pt-14 md:pb-28 xl:pb-14">
        <Loader type="Oval" color="#D1D5DB" height={70} width={70} />
      </div>
    );
  }

  return (
    <ul className="px-6 pb-6 space-y-6">
      {data && data.map(track => <TopTrackItem key={track.id} track={track} />)}
    </ul>
  );
}

export default TopTracks;
