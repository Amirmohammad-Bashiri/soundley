import { useAlbums } from "@hooks/useAlbums";
import { soundleyClient } from "@clients/soundley-client";
import Loader from "@components/loader";
import TopAlbumItem from "./top-album-item";

function TopAlbums({ inView }) {
  const { data, isFetching, isLoading } = useAlbums(
    soundleyClient,
    "/albums",
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
    <div>
      <ul className="top-albums-grid">
        {data &&
          data.map(album => <TopAlbumItem key={album.id} album={album} />)}
      </ul>
    </div>
  );
}

export default TopAlbums;
