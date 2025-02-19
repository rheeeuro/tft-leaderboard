import axios from "axios";

const BASE_URL_KR = `https://kr.api.riotgames.com`;
const BASE_URL_ASIA = `https://asia.api.riotgames.com`;
const BASE_URL_US = `https://americas.api.riotgames.com`;

export const instanceKR = axios.create({
  baseURL: BASE_URL_KR,
  headers: {
    "Content-Type": "application/json",
    "X-Riot-Token": import.meta.env.VITE_API_KEY,
  },
});
export const instanceAsia = axios.create({
  baseURL: BASE_URL_ASIA,
  headers: {
    "Content-Type": "application/json",
    "X-Riot-Token": import.meta.env.VITE_API_KEY,
  },
});
export const instanceUS = axios.create({
  baseURL: BASE_URL_US,
  headers: {
    "Content-Type": "application/json",
    "X-Riot-Token": import.meta.env.VITE_API_KEY,
  },
});
