import React from 'react';
import '../App.css';

const Scoreboard = ({ farmerScore, thiefScore }) => {
  return (
    <div className="scoreboard">
      <h3>Current Scores</h3>
      <div className="scoreboard-item">
        <span role="img" aria-label="farmer">👨‍🌾 Farmer (Warder):</span>
        <span className="score-value">{farmerScore}</span>
      </div>
      <div className="scoreboard-item">
        <span role="img" aria-label="thief">🕵️‍♂️ Thief (Prisoner):</span>
        <span className="score-value">{thiefScore}</span>
      </div>
    </div>
  );
};

export default Scoreboard;

