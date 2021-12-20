import { soundleyClient } from "@clients/soundley-client";

export async function removeFromPlaylist(body) {
  const { data } = await soundleyClient.put("/remove-from-playlist", body);

  return data;
}
