import { Stack, Flex, Heading, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context";

export function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <Stack w="100%" as="nav" bg="green.500" color="white" px="15%">
      <Flex
        maxW="1500px"
        justify="space-between"
        align="center"
        py={3}
      >
        <Heading as="h4" size="md">
          Home
        </Heading>
        <Button colorScheme="white" variant="outline" onClick={logout}>
          Logout
        </Button>
      </Flex>
    </Stack>
  );
}
