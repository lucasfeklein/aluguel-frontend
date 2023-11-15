import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://busy-rose-dove-sari.cyclic.app";

const api = axios.create({ baseURL });

export default api;
