import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./pages/Menu.jsx";
import Start from "./pages/SelectMap.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting.jsx";
import GamePlay from "./pages/Gameplay.jsx";
import Cutscene from "./pages/Cutscene.jsx";
import Role from "./pages/RoleAssignment.jsx";

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


