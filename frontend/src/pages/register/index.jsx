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
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../../utils";
import { useNavigate } from "react-router-dom";

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

function Register() {
  const [messageAlert, setMessageAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const sendForm = async (data) => {
    setLoading(true);
    const { username, password } = data;
    console.log(username, password);
    const response = await registerUser(username, password);
    console.log(response);
    if (response.type === "success") return navigate("/login");
    else setMessageAlert(response.err.response.data.message);
    setloading(false);
  };

  return (
    <Center w="100%">
      <VStack
        onSubmit={handleSubmit(sendForm)}
        spacing={5}
        w="40%"
        my="10vh"
        maxW="1500px"
        as="form"
        bg="#f4f4f4"
        p={10}
      >
        <Heading>Register</Heading>
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

export default Register;