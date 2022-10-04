import {
  VStack,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const verifyForm = (event) => {
    event.preventDefault();
    if (username && password) return sendForm();
  };

  const sendForm = () => {
    console.log(username, password);
  };

  return (
    <Center w="100%">
      <VStack
        spacing={5}
        w="40%"
        my="10vh"
        maxW="1500px"
        as="form"
        bg="#f4f4f4"
        p={10}
      >
        <Heading>Registrar</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            focusBorderColor="green.500"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            focusBorderColor="green.500"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          w="100%"
          onClick={(e) => verifyForm(e)}
        >
          Entrar
        </Button>
        <Center>
          <Text>
            Já tem uma conta?{" "}
            <Link to="/login" style={{ fontWeight: "bold" }}>
              Entrar
            </Link>
          </Text>
        </Center>
      </VStack>
    </Center>
  );
}
