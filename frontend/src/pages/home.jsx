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
  useToast
} from "@chakra-ui/react";
import { useState, useEffect, useContext, useCallback } from "react";
import { useAuth, useTransaction } from "../context";
import { useNavigate } from "react-router-dom";
import { Card, NavbarHome, Modal, Toast } from "../components";
import { AiOutlineMore } from "react-icons/ai";
import { getAllTransaction, deleteTransaction } from "../utils";

const styleBtn = {
  cursor: "pointer",
  backgroundColor: "transparent",
  fontWeight: "bold",
  border: "none",
};

const initialState = {
  name: "",
  value: 5,
  type: "income",
  id: "",
};

function Home() {
  const [menuActive, setMenuActive] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [dataForm, setDataForm] = useState(initialState);
  const [edit, setEdit] = useState(false);

  const auth = useAuth();
  const transactionContext = useTransaction();

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const colorsType = {
    income: "green",
    expense: "red",
    invest: "orangered",
  };

  const totalCalc = transactionContext.total.totalIncome - transactionContext.total.totalExpense;

  useEffect(() => {
    if (isOpen && !edit) {
      setDataForm(initialState);
    }
  }, [isOpen]);


  useEffect(() => auth.handleMessage(''),[]);

  const create = () => {
    setEdit(false);
    setDataForm(initialState);
    onOpen();
  };

  const remove = async(id) => {
    setLoadingSpinner(true);
    const response = await transactionContext.deleteTransaction(id, auth.token);
    setLoadingSpinner(false);
  };

  const editForm = async (data) => {
    setDataForm(data);
    setEdit(true);
    onOpen();
  };

  return (
    <>
      <Modal
        setLoadingSpinner={setLoadingSpinner}
        isOpen={isOpen}
        onClose={onClose}
        data={dataForm}
        edit={edit}
        setEdit={setEdit}
      />
      {auth.isLogged ? (
        <>
        <NavbarHome />
        <Box py={5} px="15%" maxW="2000">
          <Heading as="h4" size="md" mb={5}>
            Dashboard
          </Heading>
          <Wrap spacing={10}>
            <Card title="Saldo total" value={totalCalc} />
            <Card title="Investimentos" value={transactionContext.total.totalInvest} />
          </Wrap>
          <Button onClick={create} colorScheme="green" mt={3} px={6}>
            Criar
          </Button>
          {loadingSpinner ? (
            <Center mt="20vh">
              <Spinner size="xl" />
            </Center>
          ) : (
            <Wrap my={5} w="full">
              {transactionContext.transactions &&
                transactionContext.transactions.map((transaction, index) => {
                  return (
                    <Flex w={{sm: "90%", md: "40%"}} my={5} key={index}>
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
        </>
      ) : (
        <Center mt="20vh">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}

export default Home;