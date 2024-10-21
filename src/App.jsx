import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./pages/MainMenu/Menu.jsx";
//import Start from "./pages/MapSelection/SelectMap.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Setting from "./pages/Settings/Settings.jsx";


import GamePlay from "./pages/GamePlay/Gameplay.jsx";
// import Cutscene from "./pages/CutScene/Cutscene.jsx";
// import Role from "./pages/RoleAssignment/RoleAssignment.jsx";
// import sound from "./assets/forest_sounds.mp3"
import './index.css';
import './App.css';
import Lobby from "./pages/Lobby/Lobby.jsx"



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Menu page */}
        <Route path="/" element={<Menu />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
        {/* Route for Lobby */}
        <Route path="/lobby" element={<Lobby />} />
        {/* Route for the GamePlay page at the "/start" path */}
        <Route path="/start" element={<GamePlay />} />
        
        {/* Redirect all other undefined routes to the Menu page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;



