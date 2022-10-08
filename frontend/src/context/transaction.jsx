import { createContext, useState, useContext } from "react";
import { api } from "../utils";

export const TransactionContext = createContext({});

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);
  const [total, setTotal] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalInvest: 0,
  });

  function getTransaction(data) {
    setTransactions(data.transactions);
    setTotal(data.total);
    console.log('cheguei aqui');
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
        removeTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);