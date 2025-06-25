// src/components/ui/Button.jsx - Add shouldForwardProp to prevent warnings
import styled from "styled-components";

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["variant", "size"].includes(prop),
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing?.xs || "0.5rem"};

  padding: ${(props) => {
    switch (props.variant) {
      case "sm":
        return "0.5rem 1rem";
      case "lg":
        return "1rem 1.5rem";
      default:
        return "0.75rem 1.25rem";
    }
  }};

  font-size: ${(props) => {
    switch (props.size) {
      case "sm":
        return "0.875rem";
      case "lg":
        return "1.125rem";
      default:
        return "1rem";
    }
  }};

  font-weight: 500;
  border-radius: ${(props) => props.theme.borderRadius?.lg || "0.75rem"};
  transition: all
    ${(props) => props.theme.transitions?.fast || "150ms ease-in-out"};
  cursor: pointer;

  background-color: ${(props) => {
    switch (props.variant) {
      case "secondary":
        return props.theme.colors?.gray?.[700] || "#374151";
      case "outline":
        return "transparent";
      case "ghost":
        return "transparent";
      default:
        return props.theme.colors?.primary || "#10b981";
    }
  }};

  color: ${(props) => {
    switch (props.variant) {
      case "outline":
        return props.theme.colors?.text?.secondary || "#cbd5e1";
      case "ghost":
        return props.theme.colors?.text?.secondary || "#cbd5e1";
      default:
        return props.theme.colors?.text?.primary || "white";
    }
  }};

  border: ${(props) => {
    switch (props.variant) {
      case "outline":
        return `1px solid ${props.theme.colors?.gray?.[600] || "#4b5563"}`;
      default:
        return "none";
    }
  }};

  &:hover {
    background-color: ${(props) => {
      switch (props.variant) {
        case "secondary":
          return props.theme.colors?.gray?.[600] || "#4b5563";
        case "outline":
          return props.theme.colors?.gray?.[800] || "#1f2937";
        case "ghost":
          return props.theme.colors?.gray?.[800] || "#1f2937";
        default:
          return props.theme.colors?.primaryHover || "#059669";
      }
    }};

    border-color: ${(props) => {
      switch (props.variant) {
        case "outline":
          return props.theme.colors?.gray?.[500] || "#6b7280";
        default:
          return "transparent";
      }
    }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
