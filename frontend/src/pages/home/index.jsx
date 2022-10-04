import {
  Wrap,
  Flex,
  Box,
  Center,
  Spinner,
  Heading,
  Button,
  useDisclosure,
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { createTransaction, getAllTransaction } from "../../utils";

function Card({ title, value }) {
  return (
    <Box my={5} bg="#f4f4f4" w="30%" p={5} borderRadius="lg">
      <Text>{title}</Text>
      <Heading mt={3}>R$ {value}</Heading>
    </Box>
  );
}

function Modal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState(5.0);
  const [type, setType] = useState("income");

  const { getTransaction } = useContext(AuthContext);

  const format = (val) => `R$ ` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const sendData = async (event) => {
    event.preventDefault();
    const data = { value, type };
    console.log(data);
    try {
      const response = await createTransaction({ name, value, type });
      console.log(response);
      getTransaction(response.data);
      console.log(response.data);
      setName("");
      setValue(5.0);
      setType("income");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalChakra isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transação</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5} as="form" pb={5}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Valor</FormLabel>
              <NumberInput onChange={(e) => setValue(e)} value={value}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <Select onChange={(e) => setType(e.target.value)}>
                {[
                  ["Entrada", "income"],
                  ["Saída", "expense"],
                  ["Investimento", "invest"],
                ].map((type, index) => (
                  <option
                    key={index}
                    value={type[1]}
                    onChange={(e) => console.log(e.target.value)}
                  >
                    {type[0]}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              colorScheme="green"
              w="100%"
              onClick={(event) => sendData(event)}
            >
              Enviar
            </Button>
            <Center>
              <Text>
                Preencha <Text as="b">todos</Text> os campos
              </Text>
            </Center>
          </VStack>
        </ModalBody>
      </ModalContent>
    </ModalChakra>
  );
}

export function Home() {
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
  console.log(transactions);
  return (
    <>
      <Navbar />
      <Modal isOpen={isOpen} onClose={onClose} />
      {isLogged ? (
        <Box py={5} px="15%">
          <Heading as="h4" size="md" mb={5}>
            Olá, {username}
          </Heading>
          <Wrap spacing={10}>
            <Card title="Saldo total" value={totalCalc} />
            <Card title="Investimentos" value={total.totalInvest} />
          </Wrap>
          <Button onClick={onOpen} colorScheme="green" mt={3} px={6}>
            Criar
          </Button>
          <Wrap my={5}>
            {transactions &&
              transactions.map((transaction, index) => {
                return (
                  <Flex w="40%" my={5}>
                    <Box bg={colorsType[transaction.type]} w="2%" />
                    <Box bg="#f4f4f4" w="80%" px={4} py={2}>
                      <Text>{transaction.name}</Text>
                      <Text>R$ {transaction.value}</Text>
                    </Box>
                  </Flex>
                );
              })}
          </Wrap>
        </Box>
      ) : (
        <Center mt="20vh">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}
