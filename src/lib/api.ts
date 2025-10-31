import axios from "axios";

const api = axios.create({
  baseURL: "https://bookit-anxm.onrender.com/api",
});

export default api;
