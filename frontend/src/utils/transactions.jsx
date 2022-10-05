import { api } from "./api";

const axiosConfig = {
  headers: { authorization: window.localStorage.getItem("token") },
};

export async function getAllTransaction() {
  try {
    const response = await api.get(
      "/transaction/getAllTransaction",
      axiosConfig
    );
    return response;
  } catch (err) {
    return err;
  }
}

export async function createTransaction(data) {
  try {
    const response = await api.post(
      "/transaction/createTransaction",
      data,
      axiosConfig
    );
    return getAllTransaction();
  } catch (err) {
    return err;
  }
}

export async function deleteTransaction(id) {
  try {
    const response = await api.delete(`/transaction/deleteTransaction${id}`, axiosConfig);
    return getAllTransaction();
  } catch(err) {
    return err;
  }
}

export async function editTransaction(id, data) {
  try {
    const response = await api.patch(`/transaction/updateTransaction${id}`, data, axiosConfig);
    return getAllTransaction();
  } catch(err) {
    return err;
  }
}

