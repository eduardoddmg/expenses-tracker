import { api } from "./api";

const axiosConfig = (token) => {
  return { headers: { authorization: token } }
}

export async function getAllTransaction(token) {
  try {
    const response = await api.get(
      "/transaction/getAllTransaction",
      axiosConfig(token)
    );
    const transactions = response.data.transactions;
    const total = response.data.total;
    return { type: 'success', data: {transactions, total} };
  } catch (err) {
    return { type: 'error', response: err }
  }
}

export async function createTransaction(data, token) {
  try {
    const response = await api.post(
      "/transaction/createTransaction",
      data,
      axiosConfig(token)
    );
    return true;
  } catch (err) {
    return { type: 'error', response: err }
  }
}

export async function deleteTransaction(id, token) {
  try {
    const response = await api.delete(`/transaction/deleteTransaction${id}`, axiosConfig(token));
    return true;
  } catch(err) {
    return { type: 'error', response: err }
  }
}

export async function editTransaction(id, data, token) {
  try {
    const response = await api.patch(`/transaction/updateTransaction${id}`, data, axiosConfig(token));
    return true;
  } catch(err) {
    return { type: 'error', response: err }
  }
}

