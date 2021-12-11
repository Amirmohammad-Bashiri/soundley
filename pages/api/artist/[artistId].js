export default async function handler(req, res) {
  const { method } = req;
  const { artistId } = req.query;

  if (method === "GET") {
    const artistInfoResponse = await fetch(
      `https://api.deezer.com/artist/${artistId}`
    );
    const artistInfo = await artistInfoResponse.json();

    const topTracksResponse = await fetch(
      `https://api.deezer.com/artist/${artistId}/top?limit=10`
    );
    let data = await topTracksResponse.json();
    data.artistInfo = artistInfo;

    res.status(200).json(data);
  }
}
