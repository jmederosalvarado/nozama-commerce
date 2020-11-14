import axios from "axios";

export const api = axios.create({ baseURL: "/api" });

export const mockapi = axios.create({
  baseURL: "/api/mock",
});
