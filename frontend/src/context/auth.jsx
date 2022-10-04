import { createContext, useState } from "react";
import { api } from "../utils";

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

  const register = async (username, password) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  async function login(username, password) {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      setUsername(response.data.username);
      setToken(response.data.token);
      setIsLogged(true);
      window.localStorage.setItem("token", response.data.token);
      return response;
    } catch (err) {
      console.log(err);
    }
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
        register,
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
