import React from 'react';
import './App.css';
import { ChessBoard } from './components/ChessBoard';
import { ChessType } from './types/enums';
const chessList = [
  ChessType.black,
  ChessType.none,
  ChessType.red,
  ChessType.black,
  ChessType.black,
  ChessType.none,
  ChessType.red,
  ChessType.black,
  ChessType.red,
]
function App() {
  return (
    <div className="App">
      <ChessBoard chessList={chessList} onClick={(i) => {
        console.log(i)
      }}/>
    </div>
  );
}

export default App;
