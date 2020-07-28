import React, {useState, useEffect} from 'react';
import Grid from './components/Grid';
import About from './components/About';
import './App.css';

function App() {
  let rows = 30;
  let cols = 50;
  // asign state to array for row and array for col - fill initial state with zeros
  const [gridDisplay, setGridDisplay] = useState(() => new Array(rows).fill().map(() => new Array(cols).fill(false)));
  const [generation, setGeneration] = useState(0);

  //update a array "copy" of grid then set gridDisplay state to update state
  let selectCell = (row, col) => {
    let gridCopy = arrayClone(gridDisplay);
    //find exact cell that was clicked then set to opposite
    gridCopy[row][col] = !gridCopy[row][col];
    setGridDisplay(gridCopy);
  }
  let RandomCells = () => {
    console.log("randomcells")
    //set up copy of grid
    let gridCopy = arrayClone(gridDisplay);
    //nested for loops iterate through grid decide state of each cell
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        //assign grid buffer to 50% random cell selection
        gridCopy[i][j] = Math.floor(Math.random() * 2)
      }
    }
    setGridDisplay(gridCopy);
  }
  //useEffect initiates state with random alive and dead cells
  useEffect(() => {
    return RandomCells();
    }, [])
  
  return (
    <div className="App">
    <header className="App-header">
      <h2>Conway's Game of Life</h2>
    </header>
    <h3>Generations: {generation}</h3>
    <div className="components">
      <Grid gridDisplay={gridDisplay} rows={rows} cols={cols} selectCell={selectCell}/>
      <About />
      </div>
    </div>
  );
}
//function to clone 2d arrays
let arrayClone = (arr) => {
  //parse clone arrays inside of arrays and set to string
  return JSON.parse(JSON.stringify(arr));
}
export default App;
