export default async function handler(req, res) {
  const { method, query } = req;

  if (method === "GET") {
    const response = await fetch(
      `https://api.deezer.com/genre/${query.genreId}/artists`
    );
    const data = await response.json();

    res.status(200).json(data);
  }
}
