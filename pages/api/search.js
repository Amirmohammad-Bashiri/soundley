export default async function handler(req, res) {
  const { method, query } = req;

  if (method === "GET") {
    const response = await fetch(
      `https://api.deezer.com/search/${query.activeTab}?q=${query.searchVal}`
    );
    const result = await response.json();

    res.status(200).json({ result: result.data });
  }
}
