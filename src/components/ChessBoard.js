import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTurn,
  /* setColumn, setRow */
  setFirst,
  setSecond,
  setMoveColumn,
  setMoveRow,
  /* setPositions, */
  countWhiteNumber,
  countBlackNumber,
} from "../store/gameSlice";
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

function ChessBoard() {
  const dispatch = useDispatch();
  const {
    turn,
    /* column, row */ first,
    second,
    movecolumn,
    moverow,
    /* positions */ whiteNumber,
    blackNumber,
  } = useSelector((state) => state.game);
  const [column, setColumn] = useState();
  const [row, setRow] = useState();
  const [jumpedColumn, setJumpedColumn] = useState(0);
  const [jumpedRow, setJumpedRow] = useState(0);
  const [positions, setPositions] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const countOnes = positions.reduce((total, row) => {
    return (
      total +
      row.reduce((rowCount, cell) => {
        return rowCount + (cell === 1 || cell === 10 ? 1 : 0);
      }, 0)
    );
  }, 0);

  // Kaç tane 2 olduğunu bulmak için reduce kullanımı
  const countTwos = positions.reduce((total, row) => {
    return (
      total +
      row.reduce((rowCount, cell) => {
        return rowCount + (cell === 2 || cell === 20 ? 1 : 0);
      }, 0)
    );
  }, 0);
  const [whoWin, setWhoWin] = useState(null);
  useEffect(() => {
    dispatch(countBlackNumber(countOnes));
    dispatch(countWhiteNumber(countTwos));
    if (countOnes === 0) {
      setWhoWin("white");
    }
    if (countTwos === 0) {
      setWhoWin("black");
    }
  }, [countOnes, countTwos]);

  useEffect(() => {
    console.log("whitenumber", whiteNumber);
    console.log("blacknumber", blackNumber);
  }, [whiteNumber, blackNumber]);

  const board = [];

  for (let i = 0; i < horizontalAxis.length; i++) {
    const column = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
      const number = i + j;

      if (number % 2 === 0) {
        column.push(
          <div>
            {" "}
            {horizontalAxis[i]}
            {verticalAxis[j]}
          </div>
        );
      } else {
        column.push(
          <div>
            {" "}
            {horizontalAxis[i]}
            {verticalAxis[j]}
          </div>
        );
      }
    }
    board.push(column);
  }

  useEffect(() => {
    console.log("first", first);
    console.log("second", second);
    console.log("jumped-column", jumpedColumn);
    console.log("jumped-row", jumpedRow);
  }, [first, second, jumpedColumn, jumpedRow]);

  const SelectOptions = () => {
    const updatedPositions = positions.map((row) =>
      row.map((cell) => (cell === 5 ? 0 : cell))
    );
    setPositions(updatedPositions);
  };

  const handleClick = (event) => {
    SelectOptions();
    const columnIndex = event.currentTarget.dataset.columnIndex;
    const cellIndex = event.currentTarget.dataset.cellIndex;
    dispatch(setFirst([parseInt(columnIndex), parseInt(cellIndex)]));
    console.log(columnIndex, "-", cellIndex);
    setColumn(parseInt(columnIndex));
    setRow(parseInt(cellIndex));
    /* dispatch(setColumn(parseInt(columnIndex)));
    dispatch(setRow(parseInt(cellIndex))); */
  };

  useEffect(() => {
    if (typeof column !== "undefined" && typeof row !== "undefined") {
      const updatedPositions = [...positions];
      if (turn === "white") {
        // moving empty ones
        if (updatedPositions[column][row] === 20) {
          const updatedPositions = [...positions];
          for (let i = row - 1; i >= 0; i--) {
            if (
              updatedPositions[column][i] === 2 ||
              updatedPositions[column][i] === 20
            ) {
              break;
            }
            if (
              updatedPositions[column][i] === 1 &&
              updatedPositions[column][i - 1] === 1
            ) {
              break;
            }
            if (
              updatedPositions[column][i] !== 1 &&
              updatedPositions[column][i] !== 2 &&
              updatedPositions[column][i] !== 10 &&
              updatedPositions[column][i] !== 20
            ) {
              console.log(updatedPositions[column][i]);
              updatedPositions[column][i] = 5;
            }
          }
          for (let i = row + 1; i <= 7; i++) {
            if (
              updatedPositions[column][i] === 2 ||
              updatedPositions[column][i] === 20
            ) {
              break;
            }
            if (
              updatedPositions[column][i] === 1 &&
              updatedPositions[column][i + 1] === 1
            ) {
              break;
            }
            if (
              updatedPositions[column][i] !== 1 &&
              updatedPositions[column][i] !== 2 &&
              updatedPositions[column][i] !== 10 &&
              updatedPositions[column][i] !== 20
            ) {
              console.log(updatedPositions[column][i]);
              updatedPositions[column][i] = 5;
            }
          }
          for (let i = column - 1; i >= 0; i--) {
            if (
              updatedPositions[i][row] === 2 ||
              updatedPositions[i][row] === 20
            ) {
              break;
            }
            if (
              (updatedPositions[i][row] === 1 &&
                updatedPositions[i - 1][row] === 1) ||
              (updatedPositions[i][row] === 10 &&
                updatedPositions[i - 1][row] === 10) ||
              (updatedPositions[i][row] === 1 &&
                updatedPositions[i - 1][row] === 10) ||
              (updatedPositions[i][row] === 10 &&
                updatedPositions[i - 1][row] === 1)
            ) {
              break;
            }
            if (
              updatedPositions[i][row] !== 1 &&
              updatedPositions[i][row] !== 2 &&
              updatedPositions[i][row] !== 10 &&
              updatedPositions[i][row] !== 20
            ) {
              console.log(updatedPositions[i][row]);
              updatedPositions[i][row] = 5;
            }
          }
          for (let i = column + 1; i <= 7; i++) {
            if (
              updatedPositions[i][row] === 2 ||
              updatedPositions[i][row] === 20
            ) {
              break;
            }
            if (
              (updatedPositions[i][row] === 1 &&
                updatedPositions[i + 1][row] === 1) ||
              (updatedPositions[i][row] === 10 &&
                updatedPositions[i + 1][row] === 10) ||
              (updatedPositions[i][row] === 1 &&
                updatedPositions[i + 1][row] === 10) ||
              (updatedPositions[i][row] === 10 &&
                updatedPositions[i + 1][row] === 1)
            ) {
              break;
            }
            if (
              updatedPositions[i][row] !== 1 &&
              updatedPositions[i][row] !== 2 &&
              updatedPositions[i][row] !== 10 &&
              updatedPositions[i][row] !== 20
            ) {
              console.log(updatedPositions[i][row]);
              updatedPositions[i][row] = 5;
            }
          }
          setPositions(updatedPositions);

          return;
        }
        if (updatedPositions[column - 1][row] === 0) {
          updatedPositions[column - 1][row] = 5;
        }
        if (updatedPositions[column][row - 1] === 0) {
          updatedPositions[column][row - 1] = 5;
        }
        if (updatedPositions[column][row + 1] === 0) {
          updatedPositions[column][row + 1] = 5;
        }
        //jumping on the other
        if (
          (updatedPositions[column - 1][row] === 1 ||
            updatedPositions[column - 1][row] === 10) &&
          updatedPositions[column - 2][row] === 0
        ) {
          updatedPositions[column - 2][row] = 5;
        }
        if (
          (updatedPositions[column][row - 1] === 1 ||
            updatedPositions[column][row - 1] === 10) &&
          updatedPositions[column][row - 2] === 0
        ) {
          updatedPositions[column][row - 2] = 5;
        }
        if (
          (updatedPositions[column][row + 1] === 1 ||
            updatedPositions[column][row + 1] === 10) &&
          updatedPositions[column][row + 2] === 0
        ) {
          updatedPositions[column][row + 2] = 5;
        }
      } else {
        // moving empty ones
        if (updatedPositions[column][row] === 10) {
          const updatedPositions = [...positions];
          for (let i = row - 1; i >= 0; i--) {
            if (
              updatedPositions[column][i] === 1 ||
              updatedPositions[column][i] === 10
            ) {
              break;
            }
            if (
              updatedPositions[column][i] === 2 &&
              updatedPositions[column][i - 1] === 2
            ) {
              break;
            }
            if (
              updatedPositions[column][i] !== 1 &&
              updatedPositions[column][i] !== 2 &&
              updatedPositions[column][i] !== 10 &&
              updatedPositions[column][i] !== 20
            ) {
              console.log(updatedPositions[column][i]);
              updatedPositions[column][i] = 5;
            }
          }
          for (let i = row + 1; i <= 7; i++) {
            if (
              updatedPositions[column][i] === 1 ||
              updatedPositions[column][i] === 10
            ) {
              break;
            }
            if (
              updatedPositions[column][i] === 2 &&
              updatedPositions[column][i + 1] === 2
            ) {
              break;
            }
            if (
              updatedPositions[column][i] !== 1 &&
              updatedPositions[column][i] !== 2 &&
              updatedPositions[column][i] !== 10 &&
              updatedPositions[column][i] !== 20
            ) {
              console.log(updatedPositions[column][i]);
              updatedPositions[column][i] = 5;
            }
          }
          for (let i = column - 1; i >= 0; i--) {
            if (
              updatedPositions[i][row] === 1 ||
              updatedPositions[i][row] === 10
            ) {
              break;
            }
            if (
              (updatedPositions[i][row] === 2 &&
                updatedPositions[i - 1][row] === 2) ||
              (updatedPositions[i][row] === 20 &&
                updatedPositions[i - 1][row] === 20) ||
              (updatedPositions[i][row] === 20 &&
                updatedPositions[i - 1][row] === 2) ||
              (updatedPositions[i][row] === 2 &&
                updatedPositions[i - 1][row] === 20)
            ) {
              break;
            }
            if (
              updatedPositions[i][row] !== 1 &&
              updatedPositions[i][row] !== 2 &&
              updatedPositions[i][row] !== 10 &&
              updatedPositions[i][row] !== 20
            ) {
              console.log(updatedPositions[i][row]);
              updatedPositions[i][row] = 5;
            }
          }
          for (let i = column + 1; i <= 7; i++) {
            if (
              updatedPositions[i][row] === 1 ||
              updatedPositions[i][row] === 10
            ) {
              break;
            }
            if (
              (updatedPositions[i][row] === 2 &&
                updatedPositions[i + 1][row] === 2) ||
              (updatedPositions[i][row] === 20 &&
                updatedPositions[i + 1][row] === 20) ||
              (updatedPositions[i][row] === 20 &&
                updatedPositions[i + 1][row] === 2) ||
              (updatedPositions[i][row] === 2 &&
                updatedPositions[i + 1][row] === 20)
            ) {
              break;
            }
            if (
              updatedPositions[i][row] !== 1 &&
              updatedPositions[i][row] !== 2 &&
              updatedPositions[i][row] !== 10 &&
              updatedPositions[i][row] !== 20
            ) {
              console.log(updatedPositions[i][row]);
              updatedPositions[i][row] = 5;
            }
          }
          setPositions(updatedPositions);
          return;
        }
        if (updatedPositions[column + 1][row] === 0) {
          updatedPositions[column + 1][row] = 5;
        }
        if (updatedPositions[column][row - 1] === 0) {
          updatedPositions[column][row - 1] = 5;
        }
        if (updatedPositions[column][row + 1] === 0) {
          updatedPositions[column][row + 1] = 5;
        }
        //jumping on the other
        if (
          (updatedPositions[column + 1][row] === 2 ||
            updatedPositions[column + 1][row] === 20) &&
          updatedPositions[column + 2][row] === 0
        ) {
          updatedPositions[column + 2][row] = 5;
        }
        if (
          (updatedPositions[column][row - 1] === 2 ||
            updatedPositions[column][row - 1] === 20) &&
          updatedPositions[column][row - 2] === 0
        ) {
          updatedPositions[column][row - 2] = 5;
        }
        if (
          (updatedPositions[column][row + 1] === 2 ||
            updatedPositions[column][row + 1] === 20) &&
          updatedPositions[column][row + 2] === 0
        ) {
          updatedPositions[column][row + 2] = 5;
        }
      }

      setPositions(updatedPositions);
    }
  }, [column, row]);

  useEffect(() => {
    const updatedPositions = [...positions];
    if (jumpedColumn === -2) {
      updatedPositions[column - 1][row] = 0;
      console.log("new values", column, "-", row);
      SelectOptions();
      setJumpedColumn(0);
      return;
    }
    if (jumpedColumn === 2) {
      console.log("jumpedColumn");
      updatedPositions[column + 1][row] = 0;
      console.log("new values", column, "-", row);
      SelectOptions();
      setJumpedColumn(0);

      return;
    }
    if (jumpedRow === 2) {
      updatedPositions[column][row + 1] = 0;
      console.log("new values", column, "-", row);
      SelectOptions();
      setJumpedRow(0);

      return;
    }
    if (jumpedRow === -2) {
      updatedPositions[column][row - 1] = 0;
      console.log("new values", column, "-", row);
      SelectOptions();
      setJumpedRow(0);

      return;
    }

    if (jumpedColumn === 1 || jumpedColumn === -1) {
      dispatch(toggleTurn());
      setJumpedColumn(0);
      console.log("111");
      return;
    }

    if (jumpedRow === 1 || jumpedRow === -1) {
      dispatch(toggleTurn());
      setJumpedRow(0);
      console.log("222");
      return;
    }

    setPositions(updatedPositions);
  }, [jumpedColumn, jumpedRow]);

  useEffect(() => {
    const updatedPositions = [...positions];
    if (jumpedRow > 2) {
      let count = jumpedRow;
      let k = 0;
      while (count > 0) {
        if (updatedPositions[column][row + count - 1] !== 0) {
          k += 1;
        }
        updatedPositions[column][row + count - 1] = 0;
        count -= 1;
        console.log(count);
      }
      if (k === 0) {
        dispatch(toggleTurn());
      }
    }
    SelectOptions();
  }, [jumpedRow]);

  useEffect(() => {
    const updatedPositions = [...positions];
    if (jumpedRow < -2) {
      let count = jumpedRow;
      let k = 0;
      while (count < 0) {
        if (updatedPositions[column][row + count + 1] !== 0) {
          k += 1;
        }
        updatedPositions[column][row + count + 1] = 0;
        count += 1;
        console.log(count);
      }
      if (k === 0) {
        dispatch(toggleTurn());
      }
    }
    SelectOptions();
  }, [jumpedRow]);

  useEffect(() => {
    const updatedPositions = [...positions];
    if (jumpedColumn > 2) {
      let count = jumpedColumn;
      let k = 0;
      while (count > 0) {
        if (updatedPositions[column + count - 1][row] !== 0) {
          k += 1;
        }
        updatedPositions[column + count - 1][row] = 0;
        count -= 1;
        console.log(count);
      }
      if (k === 0) {
        dispatch(toggleTurn());
      }
    }
    SelectOptions();
  }, [jumpedColumn]);

  useEffect(() => {
    const updatedPositions = [...positions];
    if (jumpedColumn < -2) {
      let count = jumpedColumn;
      let k = 0;
      while (count < 0) {
        if (updatedPositions[column + count + 1][row] !== 0) {
          k += 1;
        }
        updatedPositions[column + count + 1][row] = 0;
        count += 1;
        console.log(count);
      }
      if (k === 0) {
        dispatch(toggleTurn());
      }
    }
    SelectOptions();
  }, [jumpedColumn]);

  const handleMove = (columnIndex, cellIndex) => {
    console.log("Clicked on cell at:", columnIndex, "-", cellIndex);
    const x = columnIndex;
    dispatch(setMoveColumn(x));
    const y = parseInt(cellIndex);
    dispatch(setMoveRow(y));

    dispatch(setSecond([parseInt(columnIndex), parseInt(cellIndex)]));
    const a = columnIndex - column;
    setJumpedColumn(a);
    const b = cellIndex - row;
    setJumpedRow(b);

    console.log("column", movecolumn, "row", moverow);
    const updatedPositions = [...positions];
    if (columnIndex === 0 && turn === "white") {
      updatedPositions[columnIndex][cellIndex] = 20;
    } else if (columnIndex === 7 && turn === "black") {
      updatedPositions[columnIndex][cellIndex] = 10;
    } else {
      updatedPositions[columnIndex][cellIndex] = turn === "white" ? 2 : 1;
    }

    if (updatedPositions[column][row] === 20) {
      updatedPositions[columnIndex][cellIndex] = 20;
    }
    if (updatedPositions[column][row] === 10) {
      updatedPositions[columnIndex][cellIndex] = 10;
    }

    if (
      a === -2 &&
      (positions[column][row] === 10 || positions[column][row] === 20)
    ) {
      let k = 0;
      if (updatedPositions[column - 1][row] !== 0) {
        k += 1;
      }
      updatedPositions[column - 1][row] = 0;
      console.log("k", k);
      if (k !== 0) {
        dispatch(toggleTurn());
      }
      SelectOptions();
    }

    if (
      a === +2 &&
      (positions[column][row] === 10 || positions[column][row] === 20)
    ) {
      let k = 0;
      if (updatedPositions[column + 1][row] !== 0) {
        k += 1;
      }
      updatedPositions[column + 1][row] = 0;

      if (k !== 0) {
        dispatch(toggleTurn());
      }
      SelectOptions();
    }

    if (
      b === -2 &&
      (positions[column][row] === 10 || positions[column][row] === 20)
    ) {
      let k = 0;
      if (updatedPositions[column][row - 1] !== 0) {
        k += 1;
      }
      updatedPositions[column][row - 1] = 0;

      if (k !== 0) {
        dispatch(toggleTurn());
      }
      SelectOptions();
    }
    if (
      b === +2 &&
      (positions[column][row] === 10 || positions[column][row] === 20)
    ) {
      let k = 0;
      if (updatedPositions[column][row + 1] !== 0) {
        k += 1;
      }
      updatedPositions[column][row + 1] = 0;

      if (k !== 0) {
        dispatch(toggleTurn());
      }
      SelectOptions();
    }
    updatedPositions[column][row] = 0;
    SelectOptions();
  };

  useEffect(() => {
    console.log(positions);
  }, [positions]);

  const handleReset = () => {
    setPositions([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    setWhoWin(null);
  };

  return (
    <div className="board">
      <div className="hh1"><h1>Turkish Checkers Game</h1></div>
      {whoWin !== null && <div className="result">Winner: {whoWin}</div>}
      <div className="chess-board">
        {board.map((column, columnIndex) =>
          column.map((cell, cellIndex) => (
            <div
              className={`chess-cell ${
                (columnIndex + cellIndex) % 2 === 0
                  ? "white-tile"
                  : "black-tile"
              }  ${positions[columnIndex][cellIndex] === 5 ? "blue" : ""}`}
              onClick={() => {
                if (positions[columnIndex][cellIndex] === 5) {
                  handleMove(columnIndex, cellIndex);
                }
              }}
              data-column-index={columnIndex}
              data-cell-index={cellIndex}
              key={cellIndex}
            >
              <div
                className={`inner-div ${
                  positions[columnIndex][cellIndex] === 1
                    ? "black"
                    : positions[columnIndex][cellIndex] === 2
                    ? "white"
                    : positions[columnIndex][cellIndex] === 10
                    ? "upperblack"
                    : positions[columnIndex][cellIndex] === 20
                    ? "upperwhite"
                    : null
                }`}
                onClick={
                  turn === "white" &&
                  positions[columnIndex][cellIndex] !== 1 &&
                  positions[columnIndex][cellIndex] !== 10
                    ? handleClick
                    : turn === "black" &&
                      positions[columnIndex][cellIndex] !== 2 &&
                      positions[columnIndex][cellIndex] !== 20
                    ? handleClick
                    : null
                }
                data-column-index={columnIndex}
                data-cell-index={cellIndex}
              >
                {" "}
              </div>
            </div>
          ))
        )}
      </div>
      {whoWin !== null && <div className="reset"><button  className="centeredButton" onClick={handleReset}>RESET GAME</button></div>}
    </div>
  );
}

export default ChessBoard;
