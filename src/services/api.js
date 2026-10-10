import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-api-user-authentication-system.onrender.com/api",
  withCredentials: true,
});

export default api;