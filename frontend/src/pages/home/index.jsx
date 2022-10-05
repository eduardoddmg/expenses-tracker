import {
  Wrap,
  Flex,
  Box,
  Center,
  Spinner,
  Heading,
  Button,
  useDisclosure,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { Card, Navbar, Modal } from "../../components";
import { AiOutlineMore } from "react-icons/ai";
import { getAllTransaction, deleteTransaction } from "../../utils";

const styleBtn = {
  cursor: "pointer",
  backgroundColor: "transparent",
  fontWeight: "bold",
  border: "none",
};

export function Home() {
  const initialState = {
    name: "",
    value: 5,
    type: "income",
    id: "",
  };

  const [menuActive, setMenuActive] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [dataForm, setDataForm] = useState(initialState);
  const [edit, setEdit] = useState(false);

  const {
    isLogged,
    token,
    username,
    verifyLogin,
    logout,
    total,
    getTransaction,
    transactions,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const colorsType = {
    income: "green",
    expense: "red",
    invest: "orangered",
  };

  const totalCalc = total.totalIncome - total.totalExpense;

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getAllTransaction();
        getTransaction(response.data);
        return response;
      } catch (err) {
        return err;
      }
    };

    fetchTransaction();
    const tokenStorage = window.localStorage.getItem("token");
    if (tokenStorage) {
      verifyLogin(tokenStorage);
    } else if ((!token || !username) && !isLogged) {
      logout();
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!window.localStorage.getItem("token")) navigate("/login");
  });

  useEffect(() => {
    if (isOpen && !edit) {
      setDataForm(initialState);
    }
  }, [isOpen]);

  const create = () => {
    setEdit(false);
    setDataForm(initialState);
    onOpen();
  };

  const remove = async (id) => {
    try {
      setLoadingRemove(true);
      console.log(id);
      const response = await deleteTransaction(id);
      getTransaction(response.data);
      console.log(response.data);
      setLoadingRemove(false);
    } catch (err) {
      console.log(err);
    }
  };

  const editForm = async (data) => {
    setDataForm(data);
    setEdit(true);
    onOpen();
  };

  return (
    <>
      <Navbar />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        data={dataForm}
        edit={edit}
        setEdit={setEdit}
      />
      {isLogged ? (
        <Box py={5} px="15%">
          <Heading as="h4" size="md" mb={5}>
            Olá, {username}
          </Heading>
          <Wrap spacing={10}>
            <Card title="Saldo total" value={totalCalc} />
            <Card title="Investimentos" value={total.totalInvest} />
          </Wrap>
          <Button onClick={create} colorScheme="green" mt={3} px={6}>
            Criar
          </Button>
          {loadingRemove ? (
            <Center mt="20vh">
              <Spinner size="xl" />
            </Center>
          ) : (
            <Wrap my={5}>
              {transactions &&
                transactions.map((transaction, index) => {
                  return (
                    <Flex w="40%" my={5}>
                      <Box bg={colorsType[transaction.type]} w="2%" />
                      <Flex
                        bg="#f4f4f4"
                        w="80%"
                        px={4}
                        py={2}
                        justify="space-between"
                      >
                        <section>
                          <Text>{transaction.name}</Text>
                          <Text>R$ {transaction.value}</Text>
                        </section>
                        <Menu>
                          <MenuButton
                            as={Button}
                            style={styleBtn}
                            rightIcon={<AiOutlineMore />}
                          />
                          <MenuList>
                            <MenuItem
                              onClick={() =>
                                editForm({
                                  id: transaction._id,
                                  value: transaction.value,
                                  type: transaction.type,
                                  name: transaction.name,
                                })
                              }
                            >
                              Editar
                            </MenuItem>
                            <MenuItem onClick={() => remove(transaction._id)}>
                              Apagar
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Flex>
                  );
                })}
            </Wrap>
          )}
        </Box>
      ) : (
        <Center mt="20vh">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}
