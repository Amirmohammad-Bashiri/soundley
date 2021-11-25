import axios from "axios";

export const deezerClient = axios.create({
  baseURL: "https://api.deezer.com",
});
