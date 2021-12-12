export async function getGenres(client, url) {
  const { data } = await client.get(url);
  const genres = data.data.slice(1);
  return genres;
}

export async function getGenreItem(client, url) {
  const { data } = await client.get(url);
  return data;
}
