import React, { useState, useEffect, useRef } from 'react';
import Grid from './components/Grid';
import Buttons from './components/Buttons';
import Modal from './components/Modal';
import triangles from '../src/images/triangles.jpg';
import './App.scss';



function App() {
  let rows = 30;
  let cols = 50;
  let speed = 100;

  // asign state to array for row and array for col - fill initial state with zeros
  const [gridDisplay, setGridDisplay] = useState(() => new Array(rows).fill().map(() => new Array(cols).fill(false)));
  const [generation, setGeneration] = useState(0);
  // const [speed, setSpeed] = useState(100);

  //update a array "copy" of grid then set gridDisplay state to update state
  let selectCell = (row, col) => {
    let gridCopy = arrayClone(gridDisplay);
    //find exact cell that was clicked then set to opposite
    gridCopy[row][col] = !gridCopy[row][col];
    setGridDisplay(gridCopy);
    console.log("SELECTED SHIT", gridCopy[row][col])
  }
  let randomCells = (i, j) => {

    //set up copy of grid
    let gridCopy = arrayClone(gridDisplay);
    //nested for loops iterate through grid decide state of each cell
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        //assign grid buffer to 50% random cell selection
        if (Math.floor(Math.random() * 2)) {
          gridCopy[i][j] = true
        }
        // gridCopy[i][j] = Math.floor(Math.random() * 2)
      }
    }
    console.log("SET GRID DISPLAY", gridDisplay)
    return gridCopy
  }

  // useEffect initiates state with random alive and dead cells
  // useEffect(() => {
  //   console.log('random ceeeells', randomCells())
  //   return (start())
  // }, [])
  useEffect(() => {
    let startGame = setInterval(() => start(), 100)
    return () => {
      console.log("this is a state", start())
      clearInterval(startGame)
    }
  }, [])

  // let countNeighbors = (grid, x, y) => {
  //   let sum = 0;
  //   for (let i = -1; i < 2; i++) {
  //     for (let j = -1; j < 2; j++) {
  //       sum += grid[x + i][y + j];
  //     }
  //   }
  //   sum -= grid[x][y]
  //   return sum;
  // }

  let startButton = () => {
    let startThis = () => {
      setInterval(start(), speed);
      return clearInterval(startThis())
    }
  }
  let stopButton = () => {
    let stopThis = () => {
      return clearInterval(stopThis())
    }
  }

  let start = () => {
    //account for two grid states
    let grid = randomCells(gridDisplay);
    console.log("start grid", grid)
    let gridCopy = arrayClone(grid);
    console.log("second grid", gridCopy)

    //nested loops to iterate through cells, check state, and assign state
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {

        //  Account for the edges
        if ([i] === 0 || [i] === cols - 1 || [j] === 0 || [j] === rows - 1) {
          gridCopy[i][j] = grid[i][j];
        }

        //all of the grid placements of neighbors around current cell or grid[i][j] 
        else {
          //count live neighbors
          let aliveNeighbors = 0;

          // let aliveNeighbors = countNeighbors(grid, i, j);
          if (i < rows - 1 && grid[i + 1][j]) {
            //increase count
            aliveNeighbors += 1
          }

          if (i > 0 && grid[i - 1][j]) {
            aliveNeighbors += 1
          }

          if ((i > 0 && j > 0) && grid[i - 1][j - 1]) {
            aliveNeighbors += 1
          }

          if ((i > 0 && j < cols - 1) && grid[i - 1][j + 1]) {
            aliveNeighbors += 1
          }

          if ((i < rows - 1 && j > 0) && grid[i + 1][j - 1]) {
            aliveNeighbors += 1
          }

          if ((i < rows - 1 && cols - 1) && grid[i + 1][j + 1]) {
            aliveNeighbors += 1
          }

          if ((j < cols - 1) && grid[i][j + 1]) {
            aliveNeighbors += 1
          }

          if (j > 0 && grid[i][j - 1]) {
            aliveNeighbors += 1
          }


          //add rules of Conway's Game of Life
          if (grid[i][j] && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
            gridCopy[i][j] = false;
          }
          if (!grid[i][j] && aliveNeighbors === 3) {
            gridCopy[i][j] = true;
          }
          // else {
          //   gridCopy[i][j] = grid[i][j]
          // }
        }
      }
    }

    console.log("start function does this", gridDisplay)
    // grid = gridCopy
    return setGridDisplay(gridCopy)
    // setGeneration(generation + 1)
  }

  return (
    <div className="App">
      <div className="star-contianer">
        <img className="starlite" src={triangles} alt="" style={{ width: "300px", height: "250px" }} />
        <h2 className="title">Conway's Game of Life</h2>
        <h3 className="title">Generations: {generation}</h3>
      </div>
      <div className="components">
        <Grid gridDisplay={gridDisplay} rows={rows} cols={cols} selectCell={selectCell} />
        <Buttons startButton={startButton} stopButton={stopButton} />
        {/* //slow={slow} fast={fast} clear={clear} randomCell={randomCell} gridSize={gridSize} /> */}
        <Modal />
      </div>

    </div>
  );
}

//function to clone 2d arrays
let arrayClone = (arr) => {
  //set to string and parse clone arrays inside of arrays
  return JSON.parse(JSON.stringify(arr));
}

export default App;




  // useEffect(() => (cell, nextState) => {
  //   setGridDisplay(oldBoard => {
  //     let tempBoard = [...oldBoard];
  //     tempBoard[cell[0]][cell[1]] = nextState;
  //     return tempBoard
  //   })
  // }, [setGridDisplay]
  // )
  // function starts game
