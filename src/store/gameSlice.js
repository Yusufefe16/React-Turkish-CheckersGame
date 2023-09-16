import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    turn: "white",
    column: 0,
    row: 0,
    first:[0, 0],
    second:[0, 0],
    movecolumn: null,
    moverow: null, 
    positions:[
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    whiteNumber:0,
    blackNumber:0,
  },
  reducers: {
    toggleTurn: (state, action) => {
      state.turn = state.turn === "white" ? "black" : "white";
    },
    setColumn: (state, action) => {
      state.column = action.payload;
    },
    setRow: (state, action) => {
      state.row = action.payload;
    },
    setFirst: (state, action) => {
      state.first = action.payload;
    },
    setSecond: (state, action) => {
      state.second = action.payload;
    },
    setMoveColumn: (state, action) => {
      state.movecolumn = action.payload;
    },
    setMoveRow: (state, action) => {
      state.moverow = action.payload;
    },
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    countWhiteNumber : (state,action)=>{
      state.whiteNumber = action.payload;
    },
    countBlackNumber : (state,action)=>{
      state.blackNumber = action.payload;
    }
  }
});

export const { toggleTurn, setColumn, setRow, setFirst, setSecond, setMoveColumn, setMoveRow, setPositions, countWhiteNumber, countBlackNumber } = gameSlice.actions;

export default gameSlice.reducer;
