import styled from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer";

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.darker};
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: ${(props) => props.theme.spacing.xl} 0;
`;

export const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};
