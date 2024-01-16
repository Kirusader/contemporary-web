/** @format */

import React, { useState } from "react";

const GameBoard = ({ onSelectSquare, board }) => {
  return (
    <ol id="game-board">
      {board.map((row, rowId) => (
        <li key={rowId}>
          <ol>
            {row.map((playerSymbol, colId) => (
              <li key={colId}>
                <button
                  disabled={playerSymbol != null}
                  onClick={() => onSelectSquare(rowId, colId)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
