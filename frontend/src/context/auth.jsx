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
  const [messageAuth, setMessageAuth] = useState('');
  const [authError, setAuthError] = useState(false);

  async function login(data) {
      const { type, response, message } = await loginAction(data.username, data.password);

      if (type === 'error') {
        setUsername('');
        setToken('');
        setIsLogged(false);
        return {type , message};
      }
      else if (type === 'success') {
        setUsername(response.username);
        setToken(response.token);
        setIsLogged(true);
        return {type, token: response.token, message: response.message};
      }
  }

  function logout() {
    setUsername("");
    setToken("");
    setIsLogged(false);
  }

  function handleMessage(message) {
    setMessageAuth(message);
  }

  function handleAuthError() {
    setAuthError(!authError)
  }

  return (
    <AuthContext.Provider
      value={{
        username,
        isLogged,
        login,
        logout,
        token,
        messageAuth,
        handleMessage,
        authError,
        handleAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);