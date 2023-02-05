import axios from 'axios';

  // baseURL: "http://localhost:3001/api"
export const api = axios.create({
  baseURL: "https://contatos-mern.onrender.com/api",
});
