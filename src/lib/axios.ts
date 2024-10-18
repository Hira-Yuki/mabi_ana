import axios from "axios";

export const BASE_URL = "https://open.api.nexon.com/mabinogi/v1";
const API_KEY = import.meta.env.VITE_MABINOGI_API_KEY;

export const createAxiosInstance = (baseURL: string = BASE_URL) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "x-nxopen-api-key": API_KEY,
    },
  });
};
