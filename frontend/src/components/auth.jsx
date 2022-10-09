import { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { getAllTransaction, deleteTransaction } from "../utils";
import { useNavigate, Outlet } from 'react-router-dom';
import { AuthContext, TransactionContext, useAuth, useTransaction } from '../context';
import { Spinner, Center } from '@chakra-ui/react';

export const WithAuth = () => {
  
  const navigate = useNavigate();

  const auth = useAuth();

  const transaction = useTransaction();

  
  useEffect(() => {
    if (!window.localStorage.getItem("token")) navigate("/login");
  });

  return (
    <>
      {transaction.transactions ? <Outlet /> : <Center mt="20vh">
          <Spinner size="xl" />
        </Center>}
    </>
  )
};

export const WithoutAuth = () => {
  const auth = useAuth();
  const transaction = useTransaction();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLogged && transaction.transactions) navigate('/');
  });

  return <Outlet />
}

export const GeralAuth = () => {
  const auth = useAuth();
  const transaction = useTransaction();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenStorage = window.localStorage.getItem("token");

    const token = tokenStorage;
    const fetchTransaction = async () => {
      try {
        console.log(token);
        if (token) {
            transaction.getTransaction(token);
            return { type: 'success', response };
          }
      } catch (err) {
        return { type: 'error', err };
      }
    };

    fetchTransaction();
    console.log(token, transaction)
    if (token) {
      console.log('sanjsajnkas')
      auth.verifyLogin(token);
      navigate('/');
    } else if ((!auth.token || !auth.username) && !auth.isLogged) {
      auth.logout();
      transaction.removeTransaction();
      navigate("/login");
    }

    setLoading(false);
  }, []);
  return (
    <>
      {loading ? <Center mt="20vh">
          <Spinner size="xl" />
        </Center> : <Outlet />}
    </>
  )
};