import React, { useState } from 'react';
import './App.css';
import { CountComp } from './components/CountComp';

function App() {
  const [num, setNum] = useState(1);
  return (
    <div className="App">
      <CountComp num={num} onChange={setNum} />
    </div>
  );
}

export default App;
