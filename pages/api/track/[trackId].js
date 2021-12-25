export default async function handler(req, res) {
  const { method } = req;
  const { trackId } = req.query;

  if (method === "GET") {
    const response = await fetch(`https://api.deezer.com/track/${trackId}`);
    const data = await response.json();

    res.status(200).json(data);
  }
}
