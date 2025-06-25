// src/components/layout/Header.jsx
import styled from "styled-components";
import { Container } from "../../styles/GlobalStyles";

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.colors.gray[900]};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[700]};
  padding: ${(props) => props.theme.spacing.lg} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
    text-align: center;
  }
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const LogoIcon = styled.span`
  font-size: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  letter-spacing: -0.025em;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    font-size: 1.75rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  font-weight: 600;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.75rem;
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <BrandSection>
            <LogoIcon>🍽️</LogoIcon>
            <BrandText>
              <Title>MealCraft</Title>
              <Tagline>Fuel Your Potential</Tagline>
            </BrandText>
          </BrandSection>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};
