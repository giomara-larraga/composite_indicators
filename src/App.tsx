import React from "react";
import NavBar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ranking from "./pages/Ranking";
import BlankCards from "./pages/BlankCards";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Ranking />} />
          <Route path="/blankcards" element={<BlankCards />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;