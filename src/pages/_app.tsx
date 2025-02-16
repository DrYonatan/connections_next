import "@/styles/globals.css";
import HeaderComponent from "./components/header";
import HomePage from "./home";
import { createTheme, ThemeProvider } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e3c29b", // Tailwind's indigo-600
      contrastText: "black",
    },
  },
});


export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        <HomePage />
      </div>
    </ThemeProvider>
  );
}
