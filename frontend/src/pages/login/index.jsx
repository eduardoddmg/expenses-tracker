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
import { useState, useContext } from "react";
import { AuthContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const verifyForm = (event) => {
    event.preventDefault();
    if (username && password) return loginForm();
  };

  const loginForm = async () => {
    const response = await login(username, password);
    console.log(response);
    navigate("/");
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
        <Heading>Login</Heading>
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
            Ainda não tem uma conta?{" "}
            <Link to="/register" style={{ fontWeight: "bold" }}>
              Criar conta
            </Link>
          </Text>
        </Center>
      </VStack>
    </Center>
  );
}
