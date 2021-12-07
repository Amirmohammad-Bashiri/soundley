export async function getGenres(client, url) {
  const { data } = await client.get(url);
  const genres = data.data.slice(1);
  return genres;
}
