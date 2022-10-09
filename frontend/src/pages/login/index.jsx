import {
  VStack,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  Alert, 
  AlertIcon,
  AlertTitle, 
  AlertDescription
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useAuth, useTransaction } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as loginAction, getAllTransaction } from '../../utils';

const config = {
  username: {
    required: "o nome precisa ter entre 5 e 15 caracteres",
    minLength: {
      value: 5,
      message: "o nome precisa ter entre 5 e 15 caracteres",
    },
    maxLength: {
      value: 15,
      message: "o nome precisa ter entre 5 e 15 caracteres",
    },
  },
  password: {
    required: "a senha tem que ter entre 5 e 15 caracteres",
    minLength: {
      value: 5,
      message: "a senha tem que ter entre 5 e 15 caracteres",
    },
    maxLength: {
      value: 15,
      message: "a senha tem que ter entre 5 e 15 caracteres",
    },
  },
};

function Login() {
  const [messageAlert, setMessageAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  const transaction = useTransaction();
  const navigate = useNavigate();

  const loginForm = async (data) => {
    setLoading(true);
    const response = await auth.login(data);
    transaction.getTransaction(response.token);
    setLoading(false);
  };

  return (
    <Center w="100%">
      <VStack
        onSubmit={handleSubmit(loginForm)}
        spacing={5}
        w="40%"
        my="10vh"
        maxW="1500px"
        as="form"
        bg="#f4f4f4"
        p={10}
      >
        <Heading>Login</Heading>
        {messageAlert && (
          <Alert status="error" align="center">
            <AlertIcon />
            <AlertTitle pb={0}>Algo aconteceu!</AlertTitle>
            <AlertDescription>{messageAlert}</AlertDescription>
          </Alert>
        )}
        <FormControl isInvalid={errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            focusBorderColor="green.500"
            type="text"
            {...register("username", config.username)}
          />
          {errors.username && (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            focusBorderColor="green.500"
            type="password"
            {...register("password", config.password)}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button isLoading={loading} type="submit" colorScheme="green" w="100%">
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

export default Login;