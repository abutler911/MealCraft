import styled from "styled-components";
import { useEffect } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing?.md || "1.5rem"};
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colors?.gray?.[900] || "#111827"};
  border: 1px solid ${(props) => props.theme.colors?.gray?.[700] || "#374151"};
  border-radius: ${(props) => props.theme.borderRadius?.xl || "1rem"};
  padding: ${(props) => props.theme.spacing?.lg || "2rem"};
  max-width: ${(props) => props.maxWidth || "600px"};
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing?.lg || "2rem"};
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors?.text?.primary || "white"};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors?.text?.secondary || "#cbd5e1"};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius?.md || "0.5rem"};
  transition: all
    ${(props) => props.theme.transitions?.fast || "150ms ease-in-out"};

  &:hover {
    color: ${(props) => props.theme.colors?.text?.primary || "white"};
    background-color: ${(props) =>
      props.theme.colors?.gray?.[800] || "#1f2937"};
  }
`;

export const Modal = ({ isOpen, onClose, title, children, maxWidth }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};
