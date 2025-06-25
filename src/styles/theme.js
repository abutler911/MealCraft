// src/styles/theme.js
export const theme = {
  colors: {
    primary: "#10b981", // emerald-500
    primaryHover: "#059669", // emerald-600
    secondary: "#065f46", // emerald-800

    // Grays
    dark: "#0f172a", // slate-900
    darker: "#020617", // slate-950
    gray: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },

    // Status colors
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",

    // Text colors
    text: {
      primary: "#ffffff",
      secondary: "#cbd5e1",
      muted: "#94a3b8",
    },
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
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },

  transitions: {
    fast: "150ms ease-in-out",
    normal: "250ms ease-in-out",
    slow: "350ms ease-in-out",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};
