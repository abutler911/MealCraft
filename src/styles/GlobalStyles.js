// src/styles/GlobalStyles.js
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
 
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: ${(props) => props.theme.colors.darker};
    color: ${(props) => props.theme.colors.text.primary};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
 
  #root {
    min-height: 100vh;
  }
 
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
  }
 
  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }
 
  input, textarea {
    font-family: inherit;
    outline: none;
  }
 
  a {
    text-decoration: none;
    color: inherit;
  }
 
  ::-webkit-scrollbar {
    width: 8px;
  }
 
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.gray[800]};
  }
 
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.gray[600]};
    border-radius: 4px;
  }
 
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.gray[500]};
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0 ${(props) => props.theme.spacing.sm};
  }
`;

export const Grid = styled.div.withConfig({
  shouldForwardProp: (prop) => !["$gap", "$columns"].includes(prop),
})`
  display: grid;
  gap: ${(props) => props.$gap || props.theme.spacing.md};
  grid-template-columns: ${(props) =>
    props.$columns || "repeat(auto-fit, minmax(300px, 1fr))"};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$align",
      "$justify",
      "$gap",
      "$direction",
      "$wrap",
      "$mobileDirection",
    ].includes(prop),
})`
  display: flex;
  align-items: ${(props) => props.$align || "center"};
  justify-content: ${(props) => props.$justify || "flex-start"};
  gap: ${(props) => props.$gap || props.theme.spacing.sm};
  flex-direction: ${(props) => props.$direction || "row"};
  flex-wrap: ${(props) => props.$wrap || "nowrap"};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: ${(props) =>
      props.$mobileDirection || props.$direction || "column"};
  }
`;
