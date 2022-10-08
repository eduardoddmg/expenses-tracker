import axios from 'axios';

  // baseURL: "https://expanses-tracker.herokuapp.com/api",
export const api = axios.create({
  baseURL: "http://localhost:3001/api"
});
