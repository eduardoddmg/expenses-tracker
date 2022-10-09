import { useState, useContext, useEffect } from 'react';
import { useAuth, useTransaction } from '../context';

import { useForm } from 'react-hook-form';
import { createTransaction, getAllTransaction, deleteTransaction, editTransaction } from "../utils";
import {
  Button, 
  Center,
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast
} from '@chakra-ui/react'; 

const config = {
  name: {
    required: 'o nome precisa ter entre 5 e 15 caracteres',
    minLength: {
      value: 5,
      message: 'o nome precisa ter entre 5 e 15 caracteres'
    },
    maxLength: {
      value: 15,
      message: 'o nome precisa ter entre 5 e 15 caracteres'
    }
  },
  value: {
    required: 'o valor tem que ter entre 5 a 100.000 reais',
    min: {
      value: 5,
      message: 'o valor tem que ter entre 5 a 100.000 reais'
    },
    max: {
      value: 100000,
      message: 'o valor tem que ter entre 5 a 100.000 reais'
    }
  }
}
export function Modal({ setLoadingSpinner, isOpen, onClose, data, edit, setEdit }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const auth = useAuth();
  const transactionContext = useTransaction();

  const toast = useToast();

  const format = (val) => `R$ ` + val;
  const parse = (val) => val.replace(/^\$/, "");


  const sendData = async (transaction) => {
    console.log(transaction)    
    if (edit) return editData(transaction);
    const { name, value, type } = transaction;
    setLoadingSpinner(true);
    transactionContext.createTransaction({ name, value, type }, auth.token);
    // createTransaction({ name, value, type }, auth.token);
    // transactionContext.getTransaction(auth.token);
    onClose();
    setLoadingSpinner(false);
  };

  const editData = async(transaction) => {
    setLoadingSpinner(true);
    transactionContext.editTransaction(data.id, { name, value, type }, auth.token);
    // editTransaction(data.id, transaction, auth.token);
    // transactionContext.getTransaction(auth.token);
    setEdit(false);
    onClose();
    setLoadingSpinner(false);
}

  useEffect(() => {
    setValue('name', data.name);
    setValue('value', data.value);
    setValue('type', data.type);
  }, [data]);

  return (
    <ModalChakra isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transação</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5} as="form" pb={5} onSubmit={handleSubmit(sendData)}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" {...register('name', config.name)} />
              {errors.name && <FormErrorMessage>
                {errors.name.message}
              </FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.value}>
              <FormLabel>Valor</FormLabel>
              <NumberInput {...register('value', config.value)}>
                <NumberInputField />
              </NumberInput>
              {errors.value && <FormErrorMessage>
                {errors.value.message}
              </FormErrorMessage>}
            </FormControl>
            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <Select {...register('type')}>
                {[
                  ["Entrada", "income"],
                  ["Saída", "expense"],
                  ["Investimento", "invest"],
                ].map((type, index) => (
                  <option
                    key={index}
                    value={type[1]}
                  >
                    {type[0]}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              isLoading={loading}
              type="submit"
              colorScheme="green"
              w="100%"
            >
              Enviar
            </Button>
            <Center>
              <Text>
                Preencha <Text as="b">todos</Text> os campos
              </Text>
            </Center>
          </VStack>
        </ModalBody>
      </ModalContent>
    </ModalChakra>
  );
}