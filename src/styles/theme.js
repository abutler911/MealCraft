// src/styles/theme.js
export const theme = {
  colors: {
    primary: "#1e90ff", // dodger blue 500
    primaryHover: "#1c7cd6", // dodger blue 600
    secondary: "#0a84ff", // accent blue

    bg: "#0f0f0f", // deep charcoal background
    surface: "#1a1a1a", // card & header surfaces

    gray: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },

    text: {
      primary: "#ffffff",
      secondary: "#d4d4d8",
      muted: "#71717a",
    },

    success: "#22c55e",
    warning: "#facc15",
    error: "#ef4444",
  },

  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "4rem",
  },

  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },

  shadows: {
    sm: "0 1px 2px rgb(0 0 0 / 0.05)",
    md: "0 2px 4px rgb(0 0 0 / 0.08)",
    lg: "0 4px 8px rgb(0 0 0 / 0.08)",
    xl: "0 8px 16px rgb(0 0 0 / 0.08)",
  },

  transitions: {
    fast: "120ms ease-out",
    normal: "200ms ease-out",
    slow: "300ms ease-out",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};
