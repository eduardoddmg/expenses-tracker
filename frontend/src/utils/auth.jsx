import { api } from './api';

export const register = async (username, password) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
      });
      return { type: 'success', response }
    } catch (err) {
      return { type: 'error', err }
    }
};

export const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      return { type: 'success', response }
    } catch (err) {
      return { type: 'error', err }
    }
};

