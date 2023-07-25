import React from "react";
import NavBar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ranking from "./pages/Ranking";
import BlankCards from "./pages/BlankCards";

import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4C0F69",
    },
    secondary: {
      main: "#F5F5F5",
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Ranking />} />
          <Route path="/blankcards" element={<BlankCards />} />
        </Routes>
      </Router>
    </div>
    </ThemeProvider>

  );
}

export default App;