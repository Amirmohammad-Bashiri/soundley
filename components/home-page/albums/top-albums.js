import { useAlbums } from "@hooks/useAlbums";
import { soundleyClient } from "@clients/soundley-client";
import Loader from "@components/loader";
import TopAlbumItem from "./top-album-item";

function TopAlbums() {
  const { data, isFetching } = useAlbums(soundleyClient, "/albums");

  return (
    <>
      {isFetching ? (
        <div className="flex items-center justify-center h-52 md:h-64 2xl:h-64">
          <Loader type="Oval" color="#D1D5DB" height={70} width={70} />
        </div>
      ) : (
        <ul className="top-albums-grid">
          {data.map(album => (
            <TopAlbumItem key={album.id} album={album} />
          ))}
        </ul>
      )}
    </>
  );
}

export default TopAlbums;
