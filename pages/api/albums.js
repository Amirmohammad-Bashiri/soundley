export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const response = await fetch("https://api.deezer.com/chart/0/albums");
    const data = await response.json();

    res.status(200).json(data);
  }
}
