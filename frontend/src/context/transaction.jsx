import { createContext, useState, useContext } from "react";
import { getAllTransaction, createTransaction as createTransactionAction, editTransaction as editTransactionAction } from "../utils";

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
    console.log(type, data);
    setTransactions(data.transactions);
    setTotal(data.total);
    console.log('cheguei aqui');
  }

  async function createTransaction(data, token) {
    createTransactionAction(data, token);
    getTransaction(token);
  }

  async function editTransaction(id, data, token) {
    editTransactionAction(id, data, token);
    getTransaction(token);
  }

  function removeTransaction () {
    setTransactions(null);
    setTotal({totalIncome: 0,
    totalExpense: 0,
    totalInvest: 0})
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        total,
        getTransaction,
        createTransaction,
        editTransaction,
        removeTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);