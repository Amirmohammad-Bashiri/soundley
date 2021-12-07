import TopArtistItem from "./top-artist-item";
import { useArtists } from "@hooks/useArtists";
import { soundleyClient } from "@clients/soundley-client";
import Loader from "@components/loader";

function TopArtists() {
  const { data, isFetching } = useArtists(soundleyClient, "/artists");

  return (
    <>
      {isFetching ? (
        <div className="flex items-center justify-center h-48 md:h-52 xl:h-56">
          <Loader type="Oval" color="#D1D5DB" height={70} width={70} />
        </div>
      ) : (
        <ul className="flex items-center flex-shrink-0 space-x-5 overflow-x-scroll">
          {data.map(artist => (
            <TopArtistItem key={artist.id} artist={artist} />
          ))}
        </ul>
      )}
    </>
  );
}

export default TopArtists;
