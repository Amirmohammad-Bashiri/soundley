import TopTrackItem from "./top-track-item";

import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";

function TopTracks() {
  const { data, isFetching } = useTopTracks(soundleyClient, "/tracks");

  return (
    <ul className="px-6 pb-6 space-y-6">
      {data.map(track => (
        <TopTrackItem key={track.id} track={track} />
      ))}
    </ul>
  );
}

export default TopTracks;
