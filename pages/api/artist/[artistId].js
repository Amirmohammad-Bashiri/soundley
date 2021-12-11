export default async function handler(req, res) {
  const { method } = req;
  const { artistId } = req.query;

  if (method === "GET") {
    const response = await fetch(
      `https://api.deezer.com/artist/${artistId}/top`
    );
    const data = await response.json();

    res.status(200).json(data);
  }
}
