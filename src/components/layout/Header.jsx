import styled from "styled-components";
import { Container } from "../../styles/GlobalStyles";

const HeaderContainer = styled.header`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.gray[900]} 0%,
    ${(props) => props.theme.colors.gray[800]} 50%,
    ${(props) => props.theme.colors.gray[900]} 100%
  );
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.xl} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        ${(props) => props.theme.colors.primary}15 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        ${(props) => props.theme.colors.primary}10 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.lg};
    text-align: center;
  }
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  transition: all ${(props) => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    gap: ${(props) => props.theme.spacing.sm};
  }
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary} 0%,
    ${(props) => props.theme.colors.primaryHover} 100%
  );
  border-radius: ${(props) => props.theme.borderRadius.xl};
  box-shadow: 0 8px 25px ${(props) => props.theme.colors.primary}30;
  transition: all ${(props) => props.theme.transitions.normal};

  &:hover {
    box-shadow: 0 12px 35px ${(props) => props.theme.colors.primary}40;
    transform: translateY(-2px) scale(1.05);
  }

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.primaryHover}
    );
    border-radius: ${(props) => props.theme.borderRadius.xl};
    z-index: -1;
    opacity: 0;
    transition: opacity ${(props) => props.theme.transitions.normal};
  }

  &:hover::after {
    opacity: 0.3;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 45px;
    height: 45px;
  }
`;

const Logo = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: brightness(1.1);
  transition: all ${(props) => props.theme.transitions.fast};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 28px;
    height: 28px;
  }
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.text.primary} 0%,
    ${(props) => props.theme.colors.primary} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    font-size: 2rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 1.875rem;
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
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.9;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.75rem;
  }
`;

const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    order: -1;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    gap: ${(props) => props.theme.spacing.sm};
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.gray[800]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.gray[700]};
  min-width: 80px;
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    min-width: 70px;
    padding: ${(props) => props.theme.spacing.xs};
  }
`;

const StatNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.primary};
  line-height: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.125rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.muted};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.125rem;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.6875rem;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const FloatingIcon = styled.div`
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.05;
  color: ${(props) => props.theme.colors.primary};

  &:nth-child(1) {
    top: 20%;
    left: 15%;
    animation: float1 8s ease-in-out infinite;
  }
  &:nth-child(2) {
    top: 60%;
    right: 20%;
    animation: float2 10s ease-in-out infinite;
  }
  &:nth-child(3) {
    top: 30%;
    right: 10%;
    animation: float3 12s ease-in-out infinite;
  }
  &:nth-child(4) {
    bottom: 30%;
    left: 10%;
    animation: float1 9s ease-in-out infinite;
  }

  @keyframes float1 {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(5deg);
    }
  }

  @keyframes float2 {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(-5deg);
    }
  }

  @keyframes float3 {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(3deg);
    }
  }
`;

export const Header = () => {
  const stats = [
    { number: "14", label: "Days" },
    { number: "56", label: "Meals" },
    { number: "80+", label: "Items" },
  ];

  return (
    <HeaderContainer>
      <FloatingElements>
        <FloatingIcon>🥑</FloatingIcon>
        <FloatingIcon>🍽️</FloatingIcon>
        <FloatingIcon>📋</FloatingIcon>
        <FloatingIcon>⚡</FloatingIcon>
      </FloatingElements>

      <Container>
        <HeaderContent>
          <BrandSection>
            <LogoContainer>
              <Logo
                src="/applogo.png"
                alt="MealCraft Logo"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <span style={{ display: "none", fontSize: "1.5rem" }}>🍽️</span>
            </LogoContainer>
            <BrandText>
              <Title>MealCraft</Title>
              <Tagline>Fuel Your Potential</Tagline>
            </BrandText>
          </BrandSection>

          <StatsSection>
            {stats.map((stat, index) => (
              <StatItem key={index}>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsSection>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};
