// axiosConfig.js
import axios from 'axios';
export default axios.create({
  baseURL: "http://localhost/Profilein",
  withCredentials: true
});
