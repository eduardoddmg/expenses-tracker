import { createContext, useState, useContext } from "react";
import { api, login as loginAction } from "../utils";

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
      const { type, response, message } = await loginAction(data.username, data.password);
      console.log(response);
      setUsername(response.username);
      setToken(response.token);
      setIsLogged(true);
      window.localStorage.setItem("token", response.token);
      if (type === 'error') return message;
      else if (type === 'success') return {token: response.token, message: response.message};
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

  return (
    <AuthContext.Provider
      value={{
        username,
        isLogged,
        login,
        verifyLogin,
        logout,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);