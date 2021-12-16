import { soundleyClient } from "@clients/soundley-client";

export async function likeTrack(trackData) {
  const { data } = await soundleyClient.post("/like", trackData);

  return data;
}
