export async function getTopTracks(client, url) {
  const { data } = await client.get(url);
  const tracks = data.data;
  return tracks;
}
