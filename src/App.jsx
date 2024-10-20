import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./pages/MainMenu/Menu.jsx";
import Start from "./pages/MapSelection/SelectMap.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Setting from "./pages/Settings/Settings.jsx";
import GamePlay from "./pages/GamePlay/Gameplay.jsx";
import Cutscene from "./pages/CutScene/Cutscene.jsx";
import Role from "./pages/RoleAssignment/RoleAssignment.jsx";
import sound from "./assets/forest_sounds.mp3"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/start" element={<Start />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/gameplay/:role" element={<GamePlay />} />
        <Route path="/cutscene" element={<Cutscene />} />
        <Route path="/role" element={<Role />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;


