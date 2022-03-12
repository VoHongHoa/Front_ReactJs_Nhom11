import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/",
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
