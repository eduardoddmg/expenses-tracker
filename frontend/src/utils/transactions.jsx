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
    return response;
  } catch (err) {
    return err;
  }
}

export async function createTransaction(data, token) {
  try {
    const response = await api.post(
      "/transaction/createTransaction",
      data,
      axiosConfig(token)
    );
    console.log(response);
    return getAllTransaction(token);
  } catch (err) {
    return err;
  }
}

export async function deleteTransaction(id, token) {
  try {
    console.log(token);
    const response = await api.delete(`/transaction/deleteTransaction${id}`, axiosConfig(token));
    return getAllTransaction(token);
  } catch(err) {
    return err;
  }
}

export async function editTransaction(id, data, token) {
  try {
    const response = await api.patch(`/transaction/updateTransaction${id}`, data, axiosConfig(token));
    return getAllTransaction(token);
  } catch(err) {
    return err;
  }
}

