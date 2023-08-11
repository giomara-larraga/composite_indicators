import React, { useState } from "react";
import NavBar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ranking from "./pages/Ranking";
import BlankCards from "./pages/BlankCards";
import { RowsFromBackend } from "./utils/types";
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { initialList } from "./utils/data";

const theme = createTheme({
  palette: {
    primary: {
      main: "#103778",
    },
    secondary: {
      main: "#0593A2",
    }
  },
});



function App() {
  const [currentRanking, setRanking] = useState<RowsFromBackend>(initialList);
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Ranking initialRows={initialList} rows={currentRanking} setRows={setRanking}/>} />
          <Route path="/blankcards" element={<BlankCards rows={currentRanking} setRows={setRanking} />} />
        </Routes>
      </Router>
    </div>
    </ThemeProvider>

  );
}

export default App;