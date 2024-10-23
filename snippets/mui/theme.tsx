import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles";
// Define your custom primary and secondary colors
const customColors = {
  primary: {
    main: "#f0f0f0",
  },
  secondary: {
    main: "#37474f",
  },
};

// Create a common theme object with shared properties
const commonTheme: ThemeOptions = {
  palette: {
    ...customColors,
  },
  typography: {
    fontFamily: "Signika Negative, Arial, sans-serif",
    fontSize: 14,
  },
  spacing: 4, // Adjust as needed
  shape: {
    borderRadius: 4, // Adjust as needed
  },
};

// Create light and dark themes by extending the common theme
export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    mode: "light", // Set the theme type to 'light'
  },
});

export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    mode: "dark",
    background: {
      default: "#2f2f2f",
      paper: "#1e1e1e",
    }, // Set the theme type to 'dark'
  },
});
