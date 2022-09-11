import Navbar from "./Navbar";
import Footer from "./Footer";
import * as S from "../styles/geral.js";
import styled from "styled-components";

const Container = styled.section`
  padding: 1em;
  background-color: #252323;
  min-height: 95vh;
  color: white;
  width: 100%;
`;

export function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
