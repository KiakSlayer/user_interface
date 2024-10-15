import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const GamePlay = () => {
  const role = 'thief'; // Fixed role to 'thief'
  const [timeLeft, setTimeLeft] = useState(180); // Overall game timer (3 minutes)
  const [grid, setGrid] = useState([]);
  const [farmerPosition, setFarmerPosition] = useState(null);
  const [thiefPosition, setThiefPosition] = useState(null);
  const [turn, setTurn] = useState(null); // Ensure turn starts as null to avoid undefined issues
  const [turnTimeLeft, setTurnTimeLeft] = useState(10); // 10-second turn timer
  const [scores, setScores] = useState({ farmer: 0, thief: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    startGame();
  }, []);

  // Function to start or reset the game
  const startGame = async () => {
    try {
      console.log("Starting the game...");
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/games/start`);
      const gameData = response.data.gameData;

      console.log("Game started with data:", gameData);  // Log the game data to ensure it's correct

      setGrid(gameData.grid.blocks);
      setThiefPosition(gameData.grid.thiefPosition);
      setFarmerPosition(gameData.grid.farmerPosition);
      setTurn(gameData.currentTurn);  // Set the correct initial turn from the server
      setScores({
        farmer: gameData.players[0].score,
        thief: gameData.players[1].score,
      });
    } catch (error) {
      console.error("Failed to start the game:", error);
    }
  };

  // Handle the overall game timer (timeLeft)
  useEffect(() => {
    if (timeLeft > 0) {
      const gameTimer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(gameTimer);
    } else {
      navigate('/');  // Navigate back to the main menu when the timer runs out
    }
  }, [timeLeft, navigate]);

  // Handle the turn timer (turnTimeLeft)
  useEffect(() => {
    if (turnTimeLeft > 0) {
      const turnTimer = setInterval(() => {
        setTurnTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(turnTimer);
    } else {
      switchTurns();
    }
  }, [turnTimeLeft]);
// Switch turns
const switchTurns = async () => {
  try {
    console.log("Switching turns...");
    const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/games/switch-turn`);
    const updatedGameState = response.data;

    console.log("Turn switched to:", updatedGameState.currentTurn);
    setTurn(updatedGameState.currentTurn);  // Set the turn to the correct value from the server
    setTurnTimeLeft(10); // Reset turn timer to 10 seconds

    // Update the scores on the client side
    setScores({
      farmer: updatedGameState.players[0].score,
      thief: updatedGameState.players[1].score,
    });

    if (!updatedGameState.currentTurn) {
      console.error("Error: currentTurn is undefined on the client after switch");
    }

  } catch (error) {
    console.error("Error switching turn:", error);
  }
};

// Handle key press events for movement
useEffect(() => {
  const handleKeyPress = async (e) => {
    console.log(`Role: ${role}, Current Turn: ${turn}`);  // Log the role and current turn for debugging

    // Prevent movement if it's not the player's turn
    if (turn !== role) {
      console.log(`It's the ${turn}'s turn. You (${role}) cannot move.`);
      return;
    }

    let currentPosition = turn === "farmer" ? { ...farmerPosition } : { ...thiefPosition };
    const setPosition = turn === "farmer" ? setFarmerPosition : setThiefPosition;

    // Log the position before movement
    console.log(`Before move: ${turn === "farmer" ? "Farmer" : "Thief"} at`, currentPosition);

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

    try {
      // Log the position after movement
      console.log(`After move: ${turn === "farmer" ? "Farmer" : "Thief"} moving to`, currentPosition);

      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/games/move`, {
        role,  // Send the role to the server
        newPosition: currentPosition
      });

      const updatedGameState = response.data;
      setGrid(updatedGameState.grid.blocks);
      setFarmerPosition(updatedGameState.grid.farmerPosition);
      setThiefPosition(updatedGameState.grid.thiefPosition);
      setTurn(updatedGameState.currentTurn); // Ensure the turn is updated correctly from the server

      // Update the scores on the client side
      setScores({
        farmer: updatedGameState.players[0].score,
        thief: updatedGameState.players[1].score,
      });

      checkWinConditions(currentPosition); // Check win conditions after movement

    } catch (error) {
      console.error("Error processing move:", error);
    }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  };
}, [turn, farmerPosition, thiefPosition, grid, role]);



// Handle key press events for movement
useEffect(() => {
  const handleKeyPress = async (e) => {
    if (turn !== role) {
      console.log(`It's the ${turn}'s turn. You (${role}) cannot move.`);
      return;
    }

    let currentPosition = turn === "farmer" ? { ...farmerPosition } : { ...thiefPosition };
    const setPosition = turn === "farmer" ? setFarmerPosition : setThiefPosition;

    console.log(`Before move: ${turn === "farmer" ? "Farmer" : "Thief"} at`, currentPosition);

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
        return;
    }

    try {
      console.log(`After move: ${turn === "farmer" ? "Farmer" : "Thief"} moving to`, currentPosition);

      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/games/move`, {
        role,  // Send the role to the server
        newPosition: currentPosition
      });

      const updatedGameState = response.data;
      setGrid(updatedGameState.grid.blocks);
      setFarmerPosition(updatedGameState.grid.farmerPosition);
      setThiefPosition(updatedGameState.grid.thiefPosition);
      setTurn(updatedGameState.currentTurn); // Ensure the turn is updated correctly from the server

      // Update the scores on the client side
      setScores({
        farmer: updatedGameState.players[0]?.score || 0,
        thief: updatedGameState.players[1]?.score || 0,
      });

      checkWinConditions(currentPosition); // Check win conditions after movement

    } catch (error) {
      console.error("Error processing move:", error);
    }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  };
}, [turn, farmerPosition, thiefPosition, grid, role]);




  // Check win conditions
  const checkWinConditions = (currentPosition) => {
    if (turn === "thief") {
      if (currentPosition.row === farmerPosition.row && currentPosition.col === farmerPosition.col) {
        alert('Farmer catches the thief! Farmer wins!');
        setScores(prevScores => ({ ...prevScores, farmer: prevScores.farmer + 1 }));
        startGame(); // Reset the game
      } else if (grid[currentPosition.row][currentPosition.col] === 'tunnel') {
        setThiefPosition({ row: currentPosition.row, col: currentPosition.col });
        setTimeout(() => {
          alert('Thief reaches the tunnel! Thief wins!');
          setScores(prevScores => ({ ...prevScores, thief: prevScores.thief + 1 }));
          startGame(); // Reset the game
        }, 100); // Small delay to show the move before the alert
      }
    } else if (turn === "farmer") {
      if (currentPosition.row === thiefPosition.row && currentPosition.col === thiefPosition.col) {
        alert('Farmer catches the thief! Farmer wins!');
        setScores(prevScores => ({ ...prevScores, farmer: prevScores.farmer + 1 }));
        startGame(); // Reset the game
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
                  {block === 'obstacle' && 'x'}
                  {block === 'tunnel' && 't'}
                  {farmerPosition?.row === rowIndex && farmerPosition?.col === colIndex && (
                    <span role="img" aria-label="farmer">👨‍🌾</span>
                  )}
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
