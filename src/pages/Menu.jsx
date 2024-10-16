import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../index.css';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
    <h1>ESCAPE PLAN</h1>
      <button id="start-button" onClick={() => navigate('/start')}>Start</button>
      <button id="profile-button" onClick={() => navigate('/profile')}>Profile</button>
      <button id="settings" onClick={() => navigate('/setting')}>Settings</button>
    </div>
  );
};

export default Menu;
