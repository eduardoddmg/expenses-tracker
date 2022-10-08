import axios from 'axios';

export const api = axios.create({
  baseURL: "https://expanses-tracker.herokuapp.com/api",
});
