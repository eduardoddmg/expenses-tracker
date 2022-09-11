import {
  Alert as AlertChakra,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const Alert = ({ message }) => {
  return (
    <AlertChakra status="error" variant="solid" borderRadius="lg" my={3}>
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
    </AlertChakra>
  );
};
