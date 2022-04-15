import React from 'react'

const Board = ({ board, onChange }) => {

  return (
    <div className="board-wrapper">
      {board.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div className="board-cell" key={cellIndex}>
              <input 
                type="number" 
                value={cell < 0 ? cell * -1 : cell} 
                disabled={cell < 0}
                onChange={(e) => onChange(rowIndex, cellIndex, e.target.value)} 
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board;