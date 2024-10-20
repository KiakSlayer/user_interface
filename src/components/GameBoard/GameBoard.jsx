import React from 'react';
import './GameBoard.css';

const GameBoard = ({ grid, farmerPosition, thiefPosition, thiefImage }) => {
  return (
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
                  <img 
                    src={thiefImage}
                    alt="thief" 
                    className="thief-image" 
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameBoard;
