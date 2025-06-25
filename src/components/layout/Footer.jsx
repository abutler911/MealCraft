// src/components/layout/Footer.jsx
import styled from "styled-components";
import { Container } from "../../styles/GlobalStyles";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.gray[900]};
  border-top: 1px solid ${(props) => props.theme.colors.gray[700]};
  padding: ${(props) => props.theme.spacing.lg} 0;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: ${(props) => props.theme.spacing.sm};
  }
`;

const Copyright = styled.div`
  color: ${(props) => props.theme.colors.text.muted};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const Divider = styled.span`
  color: ${(props) => props.theme.colors.text.muted};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <Copyright>
            <span>© 2025 Keto Meal Planner</span>
            <Divider>•</Divider>
            <span>Built by Andy</span>
          </Copyright>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};
