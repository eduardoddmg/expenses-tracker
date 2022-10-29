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

  async function login(data) {
      const { type, response, message } = await loginAction(data.username, data.password);
      setUsername(response.username);
      setToken(response.token);
      setIsLogged(true);
      if (type === 'error') return message;
      else if (type === 'success') return {token: response.token, message: response.message};
  }

  function logout() {
    setUsername("");
    setToken("");
    setIsLogged(false);
  }

  return (
    <AuthContext.Provider
      value={{
        username,
        isLogged,
        login,
        logout,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);