import axios from "axios";

const API = axios.create({
  baseURL: "https://hr-backend-tfiu.onrender.com/api",
});

export default API;