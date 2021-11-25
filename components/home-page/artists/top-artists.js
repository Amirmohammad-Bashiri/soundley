import TopArtistItem from "./top-artist-item";
import { useArtists } from "@hooks/useArtists";
import { soundleyClient } from "@clients/soundley-client";

function TopArtists() {
  const { data, isFetching } = useArtists(soundleyClient, "/artists");

  if (isFetching) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <ul className="flex items-center flex-shrink-0 space-x-5 overflow-x-scroll">
      {data.map(artist => (
        <TopArtistItem key={artist.id} artist={artist} />
      ))}
    </ul>
  );
}

export default TopArtists;
