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
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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

export function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginForm = async (data) => {
    const { username, password } = data;
    const response = await login(username, password);
    console.log(response);
    navigate("/");
  };

  console.log(errors);
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
        <Button type="submit" colorScheme="green" w="100%">
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
