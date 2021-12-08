export async function getTopAlbums(client, url) {
  const { data } = await client.get(url);
  const albums = data.data;
  return albums;
}

export async function getAlbum(client, url) {
  const { data: album } = await client.get(url);
  return album;
}
