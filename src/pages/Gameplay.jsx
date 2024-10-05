import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const GamePlay = () => {
  const { role } = useParams(); // 'farmer' (warder) or 'thief' (prisoner)
  const [timeLeft, setTimeLeft] = useState(180);
  const [grid, setGrid] = useState([]); // Grid to store the blocks
  const [farmerPosition, setFarmerPosition] = useState(null); // Farmer (warder) position
  const [thiefPosition, setThiefPosition] = useState(null); // Thief (prisoner) position
  const [turn, setTurn] = useState("thief"); // Thief moves first
  const [turnTimeLeft, setTurnTimeLeft] = useState(10); // 10 seconds per turn
  const [scores, setScores] = useState({ farmer: 0, thief: 0 });
  const navigate = useNavigate();

  // Initialize the game grid and place characters
  const initializeGame = () => {
    const size = 5;
    const totalBlocks = size * size;
    const obstacleCount = Math.floor(totalBlocks * 0.2); // 5 obstacle blocks
    const gridArray = Array(size).fill(null).map(() => Array(size).fill('free'));

    // Randomly place obstacles
    let obstaclesPlaced = 0;
    while (obstaclesPlaced < obstacleCount) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (gridArray[row][col] === 'free') {
        gridArray[row][col] = 'obstacle';
        obstaclesPlaced++;
      }
    }

    // Randomly place tunnel block
    let tunnelPlaced = false;
    while (!tunnelPlaced) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (gridArray[row][col] === 'free') {
        gridArray[row][col] = 'tunnel';
        tunnelPlaced = true;
      }
    }

    // Randomly place thief (prisoner)
    let thiefPos = null;
    while (!thiefPos) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (gridArray[row][col] === 'free') {
        thiefPos = { row, col };
      }
    }

    // Randomly place farmer (warder)
    let farmerPos = null;
    while (!farmerPos) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (gridArray[row][col] === 'free' && (row !== thiefPos.row || col !== thiefPos.col)) {
        farmerPos = { row, col };
      }
    }

    setGrid(gridArray);
    setThiefPosition(thiefPos);
    setFarmerPosition(farmerPos);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      navigate('/'); // Go back to the main menu when time is up
    }
  }, [timeLeft, navigate]);

  // Handle turn timer (10 seconds per turn)
  useEffect(() => {
    if (turnTimeLeft > 0) {
      const timer = setInterval(() => {
        setTurnTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      switchTurns();
    }
  }, [turnTimeLeft]);

  // Switch turns between farmer and thief
  const switchTurns = () => {
    setTurnTimeLeft(10); // Reset turn timer
    setTurn(turn === "farmer" ? "thief" : "farmer"); // Switch turns
  };

  // Handle key press events for movement
  useEffect(() => {
    const handleKeyPress = (e) => {
      let currentPosition = turn === "farmer" ? { ...farmerPosition } : { ...thiefPosition };
      const setPosition = turn === "farmer" ? setFarmerPosition : setThiefPosition;

      switch (e.key) {
        case "ArrowUp":
          if (currentPosition.row > 0) currentPosition.row -= 1;
          break;
        case "ArrowDown":
          if (currentPosition.row < grid.length - 1) currentPosition.row += 1;
          break;
        case "ArrowLeft":
          if (currentPosition.col > 0) currentPosition.col -= 1;
          break;
        case "ArrowRight":
          if (currentPosition.col < grid[0].length - 1) currentPosition.col += 1;
          break;
        default:
          return; // Exit if key is not an arrow key
      }

      const newBlock = grid[currentPosition.row][currentPosition.col];
      if (newBlock === "free" || (newBlock === "tunnel" && turn === "thief")) {
        setPosition(currentPosition);
        checkWinConditions(currentPosition); // Check win conditions after movement
        switchTurns();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [turn, farmerPosition, thiefPosition, grid]);

  // Check win conditions
  const checkWinConditions = (currentPosition) => {
    if (turn === "thief") {
      // Thief loses if they move to the same block as the farmer
      if (currentPosition.row === farmerPosition.row && currentPosition.col === farmerPosition.col) {
        alert('Farmer catches the thief! Farmer wins!');
        setScores(prevScores => ({ ...prevScores, farmer: prevScores.farmer + 1 }));
        initializeGame(); // Reset the game
      }
      // Thief wins if they reach the tunnel block
      else if (grid[currentPosition.row][currentPosition.col] === 'tunnel') {
        // Move the thief visually into the tunnel
        setThiefPosition({ row: currentPosition.row, col: currentPosition.col });
        
        setTimeout(() => {
          alert('Thief reaches the tunnel! Thief wins!');
          setScores(prevScores => ({ ...prevScores, thief: prevScores.thief + 1 }));
          initializeGame(); // Reset the game
        }, 100); // Small delay to show the move before the alert
      }
    } else if (turn === "farmer") {
      // Farmer wins if they catch the thief
      if (currentPosition.row === thiefPosition.row && currentPosition.col === thiefPosition.col) {
        alert('Farmer catches the thief! Farmer wins!');
        setScores(prevScores => ({ ...prevScores, farmer: prevScores.farmer + 1 }));
        initializeGame(); // Reset the game
      }
    }
  };
  
  

  return (
    <div className="gameplay-container">
      <h1>Gameplay Page</h1>
      <h2>Your role is: {role === "farmer" ? "👨‍🌾 Farmer (Warder)" : "🕵️‍♂️ Thief (Prisoner)"}</h2>
      <p>Time left: {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      <p>Turn: {turn === "farmer" ? "👨‍🌾 Farmer (Warder)" : "🕵️‍♂️ Thief (Prisoner)"}</p>
      <p>Turn time left: {turnTimeLeft} seconds</p>

      <table className="game-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((block, colIndex) => (
                <td key={colIndex} className={`table-cell ${block}`}>
                  {/* Render obstacles as 'x' */}
                  {block === 'obstacle' && 'x'}
                  {/* Render tunnel as 't' */}
                  {block === 'tunnel' && 't'}
                  {/* Render farmer (warder) */}
                  {farmerPosition?.row === rowIndex && farmerPosition?.col === colIndex && (
                    <span role="img" aria-label="farmer">👨‍🌾</span>
                  )}
                  {/* Render thief (prisoner) */}
                  {thiefPosition?.row === rowIndex && thiefPosition?.col === colIndex && (
                    <span role="img" aria-label="thief">🕵️‍♂️</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="scores">
        <h3>Scores</h3>
        <p>Farmer (Warder): {scores.farmer}</p>
        <p>Thief (Prisoner): {scores.thief}</p>
      </div>
    </div>
  );
};

export default GamePlay;
