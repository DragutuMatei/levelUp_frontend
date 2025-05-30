import axios from "axios";
const AXIOS = axios.create({
  baseURL: "https://server-levelup.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default AXIOS;
