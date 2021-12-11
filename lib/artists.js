export async function getTopArtists(client, url) {
  const { data } = await client.get(url);
  const artists = data.data;
  return artists;
}

export async function getArtistTopTracks(client, url) {
  const { data } = await client.get(url);
  return data;
}
