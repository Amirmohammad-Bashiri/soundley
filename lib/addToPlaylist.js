import { soundleyClient } from "@clients/soundley-client";

export async function addToPlaylist(body) {
  const { data } = await soundleyClient.put("/add-to-playlist", body);

  return data;
}
