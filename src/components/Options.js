import React from "react";

const Board = ({ status, difficulty, handleClickSolve }) => {
  return (
    <>
      <div className="options">
        <div className="validation">
          <button>Validate</button>
          <label>
            <b>{status}</b>
          </label>
        </div>
        <div className="difficulty-level">
          <label>
            <b>{difficulty}</b>
          </label>
          <button>Difficulty</button>
        </div>
      </div>
      <button className="border solve" onClick={handleClickSolve}>
        Solve
      </button>
    </>
  );
};

export default Board;
