// src/styles/GlobalStyles.js
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{
    font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto',sans-serif;
    background:${(p) => p.theme.colors.bg};
    color:${(p) => p.theme.colors.text.primary};
    line-height:1.6;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
  a{color:inherit;text-decoration:none}
  button{font-family:inherit;border:none;cursor:pointer;background:none;color:inherit}
  input,textarea{font-family:inherit;border:1px solid ${(p) =>
    p.theme.colors.gray[700]};background:${(p) =>
  p.theme.colors.surface};color:${(p) =>
  p.theme.colors.text.primary};border-radius:${(p) =>
  p.theme.borderRadius.sm};padding:${(p) => p.theme.spacing.xs}}
  h1,h2,h3,h4,h5,h6{font-weight:700;line-height:1.3;color:${(p) =>
    p.theme.colors.text.primary}}
  ::selection{background:${(p) => p.theme.colors.primary};color:#fff}
  ::-webkit-scrollbar{width:8px;height:8px}
  ::-webkit-scrollbar-thumb{background:${(p) =>
    p.theme.colors.gray[700]};border-radius:4px}
  ::-webkit-scrollbar-track{background:transparent}
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: ${(p) => p.theme.spacing.md};
  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding-inline: ${(p) => p.theme.spacing.sm};
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
  align-items: ${(p) => p.$align || "center"};
  justify-content: ${(p) => p.$justify || "flex-start"};
  gap: ${(p) => p.$gap || p.theme.spacing.sm};
  flex-direction: ${(p) => p.$direction || "row"};
  flex-wrap: ${(p) => p.$wrap || "nowrap"};
  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    flex-direction: ${(p) => p.$mobileDirection || p.$direction || "column"};
  }
`;

export const Grid = styled.div.withConfig({
  shouldForwardProp: (prop) => !["$gap", "$columns"].includes(prop),
})`
  display: grid;
  gap: ${(p) => p.$gap || p.theme.spacing.md};
  grid-template-columns: ${(p) =>
    p.$columns || "repeat(auto-fit,minmax(280px,1fr))"};
  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;
