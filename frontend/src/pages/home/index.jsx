import { Layout } from "../../components";
import * as S from "./styled.js";
import { useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";

export function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <S.ContainerWidth>
        <S.Container reverse>
          <section>
            <h1>A Agenda</h1>
            <p>
              Melhore a organizações do seus contatos com a nossa agenda
              inovadora
            </p>
            <Button colorScheme="blue" onClick={() => navigate("/login")}>
              Entrar
            </Button>
          </section>
          <section>
            <img src="/assets/img1.svg" />
          </section>
        </S.Container>
      </S.ContainerWidth>
      <S.ContainerWidth>
        <S.Container>
          <section>
            <img src="/assets/img2.svg" />
          </section>
          <section>
            <h1>Empresa</h1>
            <p>
              Nós trabalhamos com afinco para entregar o melhor resultado para
              você! Acesse a plataforma e aproveite!
            </p>
          </section>
        </S.Container>
      </S.ContainerWidth>
      <S.ContainerWidth>
        <S.Container reverse>
          <section>
            <h1>Segurança</h1>
            <p>
              Todos os seus dados são armazenados com criptografia de ponta!
              Pode confiar e certeza que os seus dados estão bem seguros
            </p>
          </section>
          <section>
            <img src="/assets/img3.svg" />
          </section>
        </S.Container>
      </S.ContainerWidth>
    </Layout>
  );
}
