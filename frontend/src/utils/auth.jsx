import { api } from './api';

export const register = async (username, password) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
      });
      const transactions = response.data.transactions;
      const total = response.data.total;
      return { type: 'success', data: { transactions, total } }
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
      return { type: 'success', response: response.data }
    } catch (err) {
      return { type: 'error', response: undefined, message: err.response.data.message }
    }
};

