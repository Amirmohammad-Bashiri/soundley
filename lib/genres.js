import axios from "axios";

export async function getGenres() {
  const { data } = await axios.get("/api/genres");
  return data;
}
