export async function getTopAlbums(client, url) {
  const { data } = await client.get(url);
  const albums = data.data;
  return albums;
}
