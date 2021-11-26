import { useAlbums } from "@hooks/useAlbums";
import { soundleyClient } from "@clients/soundley-client";

import TopAlbumItem from "./top-album-item";

function TopAlbums() {
  const { data } = useAlbums(soundleyClient, "/albums");

  return (
    <div className="grid grid-cols-2 px-6 mt-8 ml-5 gap-y-20">
      {data.map(album => (
        <TopAlbumItem key={album.id} album={album} />
      ))}
    </div>
  );
}

export default TopAlbums;
