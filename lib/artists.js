import { client } from "../clients/deezer-client";

export async function getTopArtists() {
  const { data } = await client.get("/chart/0/artists");
  const artists = data.data;
  return artists;
}
