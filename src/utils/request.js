import axios from "axios";

const xaxios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true,
});

export default xaxios;
