export async function getTrack(client, url) {
  const { data: track } = await client.get(url);
  return track;
}
