import { soundleyClient } from "@clients/soundley-client";

export async function createPlaylist(playListName) {
  const { data } = await soundleyClient.post("/playlists", playListName);

  return data;
}
