import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../styles/GlobalStyles";

const HeaderContainer = styled.header`
  background: ${(p) => p.theme.colors.gray[900]};
  border-bottom: 1px solid ${(p) => p.theme.colors.gray[800]};
  padding: ${(p) => (p.shrunk ? p.theme.spacing.lg : p.theme.spacing.xl)} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  contain: paint;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(p) => p.theme.spacing.lg};
  @media (max-width: ${(p) => p.theme.breakpoints.lg}) {
    flex-direction: column;
    text-align: center;
  }
`;

const BrandLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  text-decoration: none;
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => (p.shrunk ? "44px" : "56px")};
  height: ${(p) => (p.shrunk ? "44px" : "56px")};
  background: ${(p) => p.theme.colors.primary};
  border-radius: ${(p) => p.theme.borderRadius.md};
  transition: width ${(p) => p.theme.transitions.fast},
    height ${(p) => p.theme.transitions.fast};
`;

const LogoImg = styled.img.attrs({ alt: "MealCraft logo", loading: "eager" })`
  width: ${(p) => (p.shrunk ? "24px" : "32px")};
  height: ${(p) => (p.shrunk ? "24px" : "32px")};
  object-fit: contain;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${(p) => (p.shrunk ? "1.5rem" : "2rem")};
  font-weight: 700;
  color: ${(p) => p.theme.colors.text.primary};
`;

const Tagline = styled.span`
  font-size: 0.75rem;
  color: ${(p) => p.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Stats = styled.ul`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: ${(p) => p.theme.breakpoints.lg}) {
    order: -1;
  }
`;

const Stat = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 64px;
  padding: ${(p) => p.theme.spacing.xs};
  background: ${(p) => p.theme.colors.gray[800]};
  border-radius: ${(p) => p.theme.borderRadius.sm};
  border: 1px solid ${(p) => p.theme.colors.gray[700]};
`;

const StatNumber = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${(p) => p.theme.colors.primary};
`;

const StatLabel = styled.span`
  font-size: 0.625rem;
  color: ${(p) => p.theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const Header = () => {
  const [shrunk, setShrunk] = useState(false);
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const stats = [
    { number: "14", label: "Days" },
    { number: "56", label: "Meals" },
    { number: "80+", label: "Items" },
  ];
  return (
    <HeaderContainer shrunk={shrunk}>
      <Container>
        <HeaderContent>
          <BrandLink href="/" aria-label="MealCraft home">
            <LogoBox shrunk={shrunk}>
              <LogoImg src="/applogo.png" shrunk={shrunk} />
            </LogoBox>
            <BrandText>
              <Title shrunk={shrunk}>MealCraft</Title>
              <Tagline>Fuel Your Potential</Tagline>
            </BrandText>
          </BrandLink>
          <Stats role="list">
            {stats.map((s) => (
              <Stat
                key={s.label}
                role="listitem"
                aria-label={`${s.number} ${s.label}`}
              >
                <StatNumber>{s.number}</StatNumber>
                <StatLabel>{s.label}</StatLabel>
              </Stat>
            ))}
          </Stats>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};
