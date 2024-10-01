import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const GamePlay = () => {
  const { role } = useParams(); 
  const [timeLeft, setTimeLeft] = useState(10); 
  const [gameOver, setGameOver] = useState(false); 
  const navigate = useNavigate();

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  // Prevent back button navigation
  useEffect(() => {
    const handleBackNavigation = () => {
      navigate(`/gameplay/${role}`, { replace: true }); 
    };

    window.history.pushState(null, document.title);
    window.addEventListener('popstate', handleBackNavigation);

    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [navigate, role]);

  // Redirect to the main menu after game over
  useEffect(() => {
    if (gameOver) {
      const redirectTimer = setTimeout(() => {
        navigate('/', { replace: true }); // Navigate to the main menu
      }, 3000); // 3 seconds delay

      return () => clearTimeout(redirectTimer); // Clear the timer if component unmounts
    }
  }, [gameOver, navigate]);

  // Display the game UI
  return (
    <div className="gameplay-container">
      {gameOver ? (
        <div className="game-over">
          <h1>GAME OVER</h1>
          <p>Redirecting to the main menu...</p> {/* Message to indicate redirection */}
        </div>
      ) : (
        <>
          <h1>This is the Gameplay Page</h1>
          <h2>Your role is: {role === "farmer" ? "👨‍🌾 Farmer" : "🕵️‍♂️ Thief"}</h2>
          <p>Time left: {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          
          <table className="game-table">
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <td key={colIndex} className="table-cell">
                      {/* Empty cell content */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default GamePlay;






