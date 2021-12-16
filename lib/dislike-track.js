import { soundleyClient } from "@clients/soundley-client";

export async function dislikeTrack(trackId) {
  const { data } = await soundleyClient.put("/like", { trackId });

  return data;
}
