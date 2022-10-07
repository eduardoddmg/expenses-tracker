import { createContext, useState, useContext } from "react";
import { api } from "../utils";

export const WithAuth = ({ children }) => {
  console.log('oi')
  return children;
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [transactions, setTransactions] = useState(null);
  const [total, setTotal] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalInvest: 0,
  });

  async function login(data) {
      setUsername(data.username);
      setToken(data.token);
      setIsLogged(true);
      window.localStorage.setItem("token", data.token);
      const tokenLocalStorage = window.localStorage.getItem("token");
      return tokenLocalStorage;
  }

  async function verifyLogin(token) {
    try {
      const response = await api.post(
        "/auth/verifyLogin",
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      setUsername(response.data.username);
      setToken(response.data.token);
      setIsLogged(true);
      window.localStorage.setItem("token", response.data.token);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  function logout() {
    setUsername("");
    setToken("");
    setIsLogged(false);
    window.localStorage.setItem("token", "");
  }

  function getTransaction(data) {
    setTransactions(data.transactions);
    setTotal(data.total);
    console.log(data.transactions);
  }

  return (
    <AuthContext.Provider
      value={{
        username,
        isLogged,
        login,
        verifyLogin,
        logout,
        transactions,
        total,
        getTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);