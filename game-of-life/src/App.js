import React, {useState} from 'react';
import Grid from './components/Grid';
import About from './components/About';
import './App.css';

function App() {
  let rows = 30;
  let cols = 50;
  // asign state to array for row and array for col - fill initial state with zeros
  const [gridDisplay, setGridDisplay] = useState(() => new Array(rows).fill().map(() => new Array(cols).fill(false)));

  return (
    <div className="App">
    <header className="App-header">
      <h2>Conway's Game of Life</h2>
    </header>
    <div className="components">
      <Grid gridDisplay={gridDisplay} rows={rows} cols={cols} />
      <About />
      </div>
    </div>
  );
}

export default App;
