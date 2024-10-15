// GameBoard.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const GameBoard = () => {
    const [gameState, setGameState] = useState(null);
    const [timer, setTimer] = useState(10);
    const [playerRole, setPlayerRole] = useState('prisoner'); // Set this dynamically based on actual user
    const [canMove, setCanMove] = useState(false);

    // Effect to listen to game state updates from the server
    useEffect(() => {
        socket.on('update_state', (data) => {
            setGameState(data);
            setCanMove(data.currentTurn === playerRole);
        });

        return () => {
            socket.off('update_state');
        };
    }, [playerRole]);

    // Timer logic
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 10)); // Reset timer after 10 seconds
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    // Function to handle player movement
    const handleMove = (direction) => {
        if (!canMove) return;

        const { row, col } = gameState.players.find(p => p.role === playerRole).position;
        let newPosition = { row, col };

        switch (direction) {
            case 'up':
                newPosition.row -= 1;
                break;
            case 'down':
                newPosition.row += 1;
                break;
            case 'left':
                newPosition.col -= 1;
                break;
            case 'right':
                newPosition.col += 1;
                break;
            default:
                break;
        }

        // Emit move event to the server
        socket.emit('move', {
            role: playerRole,
            newPosition
        });
    };

    if (!gameState) return <div>Loading...</div>;

    return (
        <div>
            <h1>Escape Plan Game</h1>
            <h2>Current Turn: {gameState.currentTurn}</h2>
            <h3>Timer: {timer} seconds</h3>

            {/* Render the 5x5 grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '5px' }}>
                {gameState.grid.blocks.map((row, rowIndex) => (
                    row.map((block, colIndex) => {
                        const isWarder = gameState.players[0].position.row === rowIndex && gameState.players[0].position.col === colIndex;
                        const isPrisoner = gameState.players[1].position.row === rowIndex && gameState.players[1].position.col === colIndex;

                        return (
                            <div key={`${rowIndex}-${colIndex}`} style={{ border: '1px solid black', width: '50px', height: '50px', textAlign: 'center' }}>
                                {isWarder ? 'W' : isPrisoner ? 'P' : block === 'free' ? ' ' : block === 'obstacle' ? 'X' : 'T'}
                            </div>
                        );
                    })
                ))}
            </div>

            {/* Movement controls */}
            <div>
                <button onClick={() => handleMove('up')}>Up</button>
                <button onClick={() => handleMove('down')}>Down</button>
                <button onClick={() => handleMove('left')}>Left</button>
                <button onClick={() => handleMove('right')}>Right</button>
            </div>
        </div>
    );
};

export default GameBoard;
