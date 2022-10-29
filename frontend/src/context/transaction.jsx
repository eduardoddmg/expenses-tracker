import { createContext, useState, useContext } from "react";
import { getAllTransaction, createTransaction as createTransactionAction, editTransaction as editTransactionAction, deleteTransaction as deleteTransactionAction } from "../utils";

export const TransactionContext = createContext({});

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);
  const [total, setTotal] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalInvest: 0,
  });

  async function getTransaction(token) {
    const { type, data } = await getAllTransaction(token);
    console.log('data: ', data);
    setTransactions(data.transactions);
    setTotal(data.total);
  }

  async function createTransaction(data, token) {
    const response = await createTransactionAction(data, token);
    if (response) getTransaction(token);
  }

  async function editTransaction(id, data, token) {
    const response = await editTransactionAction(id, data, token);
    if (response) getTransaction(token);
  }

  async function deleteTransaction(id, token) {
    const response = await deleteTransactionAction(id, token);
    if (response) getTransaction(token);
  } 

  function removeTransaction () {
    setTransactions(null);
    setTotal({totalIncome: 0,
    totalExpense: 0,
    totalInvest: 0});
  }


  return (
    <TransactionContext.Provider
      value={{
        transactions,
        total,
        getTransaction,
        createTransaction,
        editTransaction,
        removeTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);