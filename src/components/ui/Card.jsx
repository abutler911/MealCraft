// src/components/ui/Card.jsx - FIXED VERSION
import styled from "styled-components";

export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.gray[900]};
  border: 1px solid ${(props) => props.theme.colors.gray[700]};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: ${(props) => props.theme.spacing.lg};
  transition: all ${(props) => props.theme.transitions.normal};

  ${(props) =>
    props.$hover &&
    `
    &:hover {
      border-color: ${props.theme.colors.gray[600]};
      box-shadow: ${props.theme.shadows.md};
    }
  `}

  ${(props) =>
    props.$completed &&
    `
    border-color: ${props.theme.colors.primary};
    background-color: ${props.theme.colors.primary}20;
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const CardContent = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
`;
