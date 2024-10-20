import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./pages/Menu.jsx";
import GamePlay from "./pages/Gameplay.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Menu page */}
        <Route path="/" element={<Menu />} />
        
        {/* Route for the GamePlay page at the "/start" path */}
        <Route path="/start" element={<GamePlay />} />
        
        {/* Redirect all other undefined routes to the Menu page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;



