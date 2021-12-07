import axios from "axios";

export const soundleyClient = axios.create({
  baseURL: "/api",
});
