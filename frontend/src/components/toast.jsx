import { useToast } from '@chakra-ui/react';

export function Toast() {
  const toast = useToast()
  return toast({
    title: 'Account created.',
    description: "We've created your account for you.",
    status: 'error',
    duration: 3000,
    isClosable: true,
    position: 'bottom-right'
  })
}