import { client } from "../client";

export async function getGenres() {
  const { data } = await client.get("/genre");
  const genres = data.data.slice(1);
  return genres;
}
