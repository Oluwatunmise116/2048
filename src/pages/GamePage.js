import React from "react";
import Game2048 from "../game/Game2048";

export default function GamePage() {
  return (
    <div className="game-container">
      <h1>Play</h1>
      <Game2048 />
    </div>
  );
}
