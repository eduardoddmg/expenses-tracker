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
    console.log(auth);
    if (!auth.isLogged) navigate('/login');
  }, [auth.isLogged]);

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
    console.log(auth, transaction);
  }, [auth.isLogged]);

  return <Outlet />
}
