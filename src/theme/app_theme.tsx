import { createTheme } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";

// Custom theme for app
export const appTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    background: {
      default: "#f5f5f5", // Light gray background
      paper: "#ffffff",   // White for paper-like surfaces
    },
    text: {
      primary: "#333",    // Dark text
      secondary: "#555",  // Slightly lighter secondary text
    },
  },
});