import { useState, useContext, useEffect } from "react";
import { userContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  API_URI,
  createContact,
  updateContact,
  deleteContact as deleteContactServer,
} from "../../util";
import axios from "axios";
import { BiPencil } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { Layout, Modal, Table } from "../../components";

import { regexPhoneNumber, regexEmail } from "../../util";

import * as S from "./styled.js";

import {
  Button,
  Input,
  useDisclosure,
  Tr,
  Td,
  Spinner,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";

const FormModal = ({ isOpen, onClose, typeForm, defaultForm }) => {
  const { token, dispatch, getContact } = useContext(userContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.idUser = token;
    data._id = defaultForm._id;
    if (typeForm) {
      const contact = await updateContact(data, token);
    } else {
      const contact = await createContact(data, token);
    }
    getContact(token, dispatch);
    onClose();
    reset({ name: "", phoneNumber: "", email: "" });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <S.Form
        noBorder
        w="100%"
        formModal={true}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Adicionar contato</h1>
        <FormControl isInvalid={errors.name}>
          <Input
            type="text"
            placeholder="name"
            {...register("name", {
              required: "Username precisa ter no mínimo 5 caracteres",
              minLength: {
                value: 5,
                message: "Username precisa ter no mínimo 5 caracteres",
              },
            })}
            defaultValue={defaultForm.name}
          />
          {errors.name && (
            <FormHelperText color="red.500">
              {errors.name.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={errors.phoneNumber}>
          <Input
            type="number"
            placeholder="phoneNumber"
            {...register("phoneNumber", {
              required: "Número inválido",
              pattern: { value: regexPhoneNumber, message: "Número inválido" },
            })}
            defaultValue={defaultForm.phoneNumber}
          />
          {errors.phoneNumber && (
            <FormHelperText color="red.500">
              {errors.phoneNumber.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={errors.email}>
          <Input
            type="email"
            placeholder="email"
            {...register("email", {
              required: "Email inválido",
              pattern: { value: regexEmail, message: "Email inválido" },
            })}
            defaultValue={defaultForm.email}
          />
          {errors.email && (
            <FormHelperText color="red.500">
              {errors.email.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button colorScheme="blue" type="submit">
          submit
        </Button>
      </S.Form>
    </Modal>
  );
};

export function Dashboard() {
  const defaultFormInitialValue = { name: "", phoneNumber: "", email: "" };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loadingState, setLoadingState] = useState(true);
  const [typeForm, setTypeForm] = useState(0);
  const [defaultForm, setDefaultForm] = useState(defaultFormInitialValue);

  const { username, token, contacts, dispatch, login, getContact } =
    useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    login(token, dispatch);
    setLoadingState(false);
    !token && navigate("/");
  }, []);

  const createContact = () => {
    onOpen();
    setTypeForm(0);
    setDefaultForm(defaultFormInitialValue);
  };

  const editContact = (data) => {
    onOpen();
    setTypeForm(1);
    setDefaultForm(data);
    console.log(data);
  };

  const deleteContact = async (data) => {
    const contact = await deleteContactServer(data, token);
    getContact(token, dispatch);
  };

  return (
    <Layout>
      {loadingState ? (
        <S.ContainerSpinner>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </S.ContainerSpinner>
      ) : (
        <S.ContainerWidth>
          <h1>
            Seja bem-vindo, <b>{username}</b>
          </h1>
          <Button onClick={createContact} colorScheme="blue" mb="2em">
            criar
          </Button>
          {contacts && contacts.length > 0 ? (
            <Table color="#262020" header={["nome", "telefone", "email"]}>
              {contacts &&
                contacts.map((contact, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{contact.name}</Td>
                      <Td>{contact.phoneNumber}</Td>
                      <Td>{contact.email}</Td>
                      <Td>
                        <S.Button
                          color="orange"
                          onClick={() => editContact(contact)}
                        >
                          <BiPencil />
                        </S.Button>
                      </Td>
                      <Td>
                        <S.Button
                          color="red"
                          onClick={() => deleteContact(contact)}
                        >
                          <BsFillTrashFill />
                        </S.Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Table>
          ) : (
            <h1>
              Ainda não há nenhum <b>contato cadastrado</b>
            </h1>
          )}
          {open && (
            <FormModal
              isOpen={isOpen}
              onClose={onClose}
              typeForm={typeForm}
              defaultForm={defaultForm}
            />
          )}
        </S.ContainerWidth>
      )}
    </Layout>
  );
}
