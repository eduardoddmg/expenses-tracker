import { Box, Text, Heading } from '@chakra-ui/react';

export function Card({ title, value }) {
  return (
    <Box my={5} bg="#f4f4f4" w={{sm: '90%', md: "30%"}} p={5} borderRadius="lg">
      <Text>{title}</Text>
      <Heading mt={3}>R$ {value}</Heading>
    </Box>
  );
};