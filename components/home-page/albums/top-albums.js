import { useAlbums } from "@hooks/useAlbums";
import { soundleyClient } from "@clients/soundley-client";

import TopAlbumItem from "./top-album-item";

function TopAlbums() {
  const { data } = useAlbums(soundleyClient, "/albums");

  return (
    <ul className="top-albums-grid">
      {data.map(album => (
        <TopAlbumItem key={album.id} album={album} />
      ))}
    </ul>
  );
}

export default TopAlbums;
