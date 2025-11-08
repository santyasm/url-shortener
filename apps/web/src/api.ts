import ky from "ky";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8787";

export const api = ky.create({
  prefixUrl: API_BASE,
  retry: 0,
});
