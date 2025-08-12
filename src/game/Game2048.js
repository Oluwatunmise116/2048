// src/game/Game2048.js
import React, { useState, useEffect, useCallback } from "react";
import Tile from "./Tile";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/react";
import { getWriteContractFrom } from "../chain/contract";
import "./Game2048.css";

const SIZE = 4;

function createEmptyBoard() {
  return Array(SIZE)
    .fill()
    .map(() => Array(SIZE).fill(0));
}

function addRandomTile(board) {
  let emptyTiles = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) emptyTiles.push({ r, c });
    }
  }
  if (emptyTiles.length === 0) return board;
  const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
  return board;
}

function copyBoard(board) {
  return board.map(row => [...row]);
}

function boardsEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function transpose(board) {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
}

function reverse(board) {
  return board.map(row => [...row].reverse());
}

function moveLeft(board) {
  let newBoard = board.map(row => {
    let filtered = row.filter(x => x !== 0);
    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        filtered[i + 1] = 0;
      }
    }
    filtered = filtered.filter(x => x !== 0);
    while (filtered.length < SIZE) {
      filtered.push(0);
    }
    return filtered;
  });
  return newBoard;
}

export default function Game2048() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const startGame = () => {
    let newBoard = createEmptyBoard();
    newBoard = addRandomTile(newBoard);
    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  };

  const isGameOver = (board) => {
    // Check for empty space
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === 0) return false;
        if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return false;
        if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return false;
      }
    }
    return true;
  };

  const handleMove = useCallback(
    (direction) => {
      let rotated = board;
      if (direction === "up") rotated = transpose(board);
      if (direction === "down") rotated = reverse(transpose(board));
      if (direction === "right") rotated = reverse(board);

      let movedBoard = moveLeft(rotated);

      if (direction === "up") movedBoard = transpose(movedBoard);
      if (direction === "down") movedBoard = transpose(reverse(movedBoard));
      if (direction === "right") movedBoard = reverse(movedBoard);

      if (!boardsEqual(board, movedBoard)) {
        let newScore = 0;
        for (let r = 0; r < SIZE; r++) {
          for (let c = 0; c < SIZE; c++) {
            if (movedBoard[r][c] > board[r][c]) {
              newScore += movedBoard[r][c] - board[r][c];
            }
          }
        }
        movedBoard = addRandomTile(movedBoard);
        setBoard(movedBoard);
        setScore((prev) => prev + newScore);

        if (isGameOver(movedBoard)) {
          setGameOver(true);
        }
      }
    },
    [board]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") handleMove("up");
      if (e.key === "ArrowDown") handleMove("down");
      if (e.key === "ArrowLeft") handleMove("left");
      if (e.key === "ArrowRight") handleMove("right");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleMove]);

  // Touch controls for mobile
  useEffect(() => {
    let startX, startY;
    const touchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };
    const touchEnd = (e) => {
      if (startX === undefined || startY === undefined) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) handleMove("right");
        else handleMove("left");
      } else {
        if (dy > 0) handleMove("down");
        else handleMove("up");
      }
      startX = undefined;
      startY = undefined;
    };
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);
    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [handleMove]);

  // Submit score on-chain
  const submitOnchainScore = async () => {
    try {
      if (!isConnected) {
        await open();
        return;
      }
      if (chainId !== 16601 && walletProvider?.request) {
        await walletProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x40D9" }]
        });
      }
      const c = await getWriteContractFrom(walletProvider);
      const tx = await c.submitScore(score);
      await tx.wait();
      alert("Score saved on-chain! 🎉");
    } catch (err) {
      console.error(err);
      alert(err?.reason || err?.message || "Failed to submit score.");
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="game-container">
      <div className="score-board">
        <h2>Score: {score}</h2>
        <button onClick={startGame}>🔄 Restart</button>
      </div>

      <div className="board">
        {board.map((row, r) => (
          <div key={r} className="board-row">
            {row.map((cell, c) => (
              <Tile key={c} value={cell} />
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h3>😵 Game Over!</h3>
          <p>Your score: {score}</p>
          <button onClick={startGame}>Play Again</button>
          <button onClick={submitOnchainScore}>💾 Save Score On-Chain</button>
        </div>
      )}
    </div>
  );
}
