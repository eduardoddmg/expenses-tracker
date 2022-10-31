import { Stack, Flex, Heading, Button, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { useAuth, useTransaction } from "../context";
import { useNavigate, Link } from 'react-router-dom';

export function NavbarProfile() {
  const auth = useAuth();
  const transaction = useTransaction();

  const logout = () => {
    auth.logout();
    transaction.removeTransaction();
  }

  return (
    <Stack w="100%" as="nav" bg="green.500" color="white" px="15%">
      <Flex
        maxW="1500px"
        justify="space-between"
        align="center"
        py={3}
      >
        <Heading as="h4" size="md">
          <Link to="/">
            Home
          </Link>
        </Heading>
        <Button colorScheme="white" variant="outline" onClick={logout}>
          Logout
        </Button>
      </Flex>
    </Stack>
  );
}

export function NavbarHome() {

  const navigate = useNavigate();
  const goToProfile = () => navigate('/profile');

  return (
    <Stack  w="full" as="nav" bg="green.500" color="white" px="15%">
      <Flex
        maxW="1500px"
        justify="space-between"
        align="center"
        py={3}
      >
        <Heading as="h4" size="md">
          <Link to="/">
            Home
          </Link>
        </Heading>
        <Button colorScheme="white" variant="outline" onClick={goToProfile}>
          Profile
        </Button>
      </Flex>
    </Stack>
  ); 
}