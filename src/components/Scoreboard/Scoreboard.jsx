import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ farmerScore, thiefScore }) => {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      <div className="scoreboard-item">
        <span>Farmer:</span>
        <span className="score-value">{farmerScore}</span>
      </div>
      <div className="scoreboard-item">
        <span>Thief:</span>
        <span className="score-value">{thiefScore}</span>
      </div>
    </div>
  );
};

export default Scoreboard;
