import React from 'react';
import './App.css';
import Chess from './components/Chess';
import { ChessType } from './types/enums';

function App() {
  return (
    <div className="App">
      <Chess type={ChessType.red} />
      <Chess type={ChessType.black} />
      <Chess type={ChessType.none} />
    </div>
  );
}

export default App;
