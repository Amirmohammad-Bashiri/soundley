import TopArtistItem from "./top-artist-item";
import { useArtists } from "@hooks/useArtists";

function TopArtists() {
  const [data, isLoading, isError] = useArtists();

  if (isError) {
    return <h1>Could not get top artists</h1>;
  }

  return (
    <ul className="flex items-center flex-shrink-0 space-x-5 overflow-x-scroll">
      {!isLoading
        ? data.map(artist => <TopArtistItem key={artist.id} artist={artist} />)
        : null}
    </ul>
  );
}

export default TopArtists;
