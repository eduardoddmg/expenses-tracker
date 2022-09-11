import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import { Button } from "@chakra-ui/react";

import * as S from "./styled.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { token, dispatch } = useContext(userContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const changeStateNavbar = () => setIsOpen(!isOpen);

  return (
    <S.ContainerWidth>
      <S.Navbar active={isOpen}>
        <section>
          <S.NavbarHome>
            <Link to="/">Home</Link>
            <button onClick={changeStateNavbar}>
              {!isOpen ? <BiMenu /> : <AiOutlineClose />}
            </button>
          </S.NavbarHome>
        </section>
        <S.NavbarOthersLinks active={isOpen}>
          {token && <S.NavbarLink to="/dashboard">Dashboard</S.NavbarLink>}
          {token ? (
            <Button colorScheme="blue" onClick={logout}>
              logout
            </Button>
          ) : (
            <Button as={Link} colorScheme="blue" to="/login">
              Entrar
            </Button>
          )}
        </S.NavbarOthersLinks>
      </S.Navbar>
    </S.ContainerWidth>
  );
}
