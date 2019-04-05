import axios from "axios";

const api = axios.create({
  baseURL: "https://apextab.com/api",
  crossDomain: true
});

export default api;
