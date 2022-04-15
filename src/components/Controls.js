import React from 'react'



const Board = ({ onClick, onClear }) => {

  return (
    <div className="controls">
    <b>Generate</b>
    <button onClick={onClick} data-value="easy">
      Easy
    </button>
    <button onClick={onClick} data-value="medium">
      Medium
    </button>
    <button onClick={onClick} data-value="hard">
      Hard
    </button>
    <button onClick={onClick} data-value="random">
      Random
    </button>
    <button className="ml-auto" onClick={onClear}>CLEAR</button>
  </div>
  )
}

export default Board;