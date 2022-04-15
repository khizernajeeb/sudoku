import React, { useEffect, useState } from "react";
const axios = require("axios");

import Board from "./components/Board";
import Controls from "./components/Controls";
import Options from "./components/Options";

import { produce } from "immer";
import { GENERATE_BOARD, SOLVE_BOARD } from "./api";

const emptyFillArray = () =>
  new Array(9).fill(0).map(() => new Array(9).fill(""));

const App = () => {
  const defaultOptions = {
    difficulty: "easy",
    status: "unresolved",
    board: emptyFillArray(),
  };

  // let [difficulty, setDifficulty] = useState(defaultOptions.difficulty);

  // let [options, setOptions] = useState(defaultOptions);

  let [game, setGame] = useState(defaultOptions);
  useEffect(() => {
    fetchBoardState(defaultOptions.difficulty, setGame);
  }, []);

  const fetchBoardState = (difficulty, callback) => {
    let url = `${GENERATE_BOARD}?difficulty=${difficulty}`;

    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        let board = emptyFillArray();
        for (let key in data.puzzle) {
          let value = data.puzzle[key];
          let [rowIndex, cellInex] = key.split("");
          rowIndex = rowIndex.charCodeAt(0) - 65;
          cellInex = Number(cellInex) - 1;
          board[rowIndex][cellInex] = Number(value) * -1;
        }
        callback({ ...game, board, difficulty: data.difficulty });
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };

  const fetchBoardSolve = (board, callback) => {
    let url = SOLVE_BOARD;
    const normalizeBoard = board.map((row) => {
      return row.map((col, index) => {
        if (col === "") {
          return 0;
        } else if (col < 1) {
          return col * -1;
        }

        return Number(col);
      });
    });

    let formData = new FormData();
    formData.append("board", JSON.stringify(normalizeBoard));

    axios
      .post(url, formData)
      .then((response) => {
        const { data } = response;
        // setOptions(data);
        setGame({ ...game, board: data.solution, status: data.status });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const handleBoardChange = (rowIndex, cellIndex, value) => {
    if (value.length > 1) {
      return;
    }

    console.log("change", value, game, rowIndex, cellIndex);
    const board = produce(game.board, (draft) => {
      draft[rowIndex][cellIndex] = value;
    });
    setGame({ ...game, board });
  };

  const handleChangeDifficulty = (event) => {
    let value = event.target.dataset.value;
    fetchBoardState(value, setGame);
  };

  const handleClickSolve = () => {
    fetchBoardSolve(game.board, setGame);
  };

  const handleClear = () => {
    const board = emptyFillArray();
    setGame({ ...game, board });
  };

  console.log("state board", game);

  const { board, difficulty, status } = game;

  return (
    <div className="wrapper">
      <h1>suGOku</h1>
      <Board board={board} onChange={handleBoardChange} />
      <Controls onClick={handleChangeDifficulty} onClear={handleClear} />
      <Options
        difficulty={difficulty}
        status={status}
        handleClickSolve={handleClickSolve}
      />
    </div>
  );
};

export default App;
