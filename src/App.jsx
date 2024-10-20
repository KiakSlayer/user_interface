import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./pages/Menu.jsx";
import Start from "./pages/SelectMap.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Setting from "./pages/Settings/Settings.jsx";
import GamePlay from "./pages/Gameplay.jsx";
import Cutscene from "./pages/Cutscene.jsx";
import Role from "./pages/RoleAssignment.jsx";
import sound from "./assets/forest_sounds.mp3"

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



