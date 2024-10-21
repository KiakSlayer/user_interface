import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the player name to the server
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/setName`, { name: playerName });
      // Navigate to the GamePlay page
      navigate('/start');
      console.log("Sent to server");
    } catch (error) {
      console.error("Error sending player name to the server:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
        required
      />
      <button type="submit">Start Game</button>
    </form>
  );
};

export default Lobby;
