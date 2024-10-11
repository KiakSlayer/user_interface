import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
    <h1>Main Menu</h1>
      <button onClick={() => navigate('/start')}>PLAY GAME</button>
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button onClick={() => navigate('/setting')}>Setting</button>
    </div>
  );
};

export default Menu;
