import { useEffect, useContext } from 'react';
import { getAllTransaction, deleteTransaction } from "../utils";
import { useNavigate, Outlet } from 'react-router-dom';
import { AuthContext, TransactionContext, useAuth, useTransaction } from '../context'

export const WithAuth = () => {
  
  const navigate = useNavigate();

  const auth = useAuth();

  const transaction = useTransaction();

  useEffect(() => {
    const tokenStorage = window.localStorage.getItem("token");
    const fetchTransaction = async () => {
      try {
        const response = await getAllTransaction();
        transaction.getTransaction(response.data);
        return response;
      } catch (err) {
        return err;
      }
    };

    fetchTransaction();
    if (tokenStorage) {
      auth.verifyLogin(tokenStorage);
    } else if ((!auth.token || !auth.username) && !auth.isLogged) {
      logout();
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!window.localStorage.getItem("token")) navigate("/login");
  });

  console.log('oi')
  return <Outlet />;
};