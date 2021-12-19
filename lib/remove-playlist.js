import { soundleyClient } from "@clients/soundley-client";

export async function removePlaylist(playlistId) {
  const { data } = await soundleyClient.put("/playlists", playlistId);

  return data;
}
