import React, { useState, useEffect, useCallback, useRef } from "react";
import Grid from './components/Grid';
import Buttons from './components/Buttons';
import Modal from './components/Modal';
// import triangles from '../src/images/triangles.jpg';
import './App.scss';



function App() {

  // asign state to array for row and array for col - fill initial state with zeros
  const [gridDisplay, setGridDisplay] = useState(() => new Array(rows).fill().map(() => new Array(cols).fill(Math.random() > 0.25 ? true : false)));
  const [generation, setGeneration] = useState(0);
  const [interval, setInterval] = useState(null);
  const [isRunning, setIsRunning] = useState(false);



  let rows = 30;
  let cols = 50;
  let speed = 100;

  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];


  //update a array "copy" of grid then set gridDisplay state to update state
  const selectCell = (x, y) => {
    const gridCopy = gridDisplay.map((row, rowKey) => {
      if (rowKey === x) {
        return row.map((cell, colKey) => {
          if (colKey === y) {
            return cell === 0 ? 1 : 0;
          } else {
            return cell;
          }
        });
      } else {
        return row;
      }
    });
    setGridDisplay(gridCopy);
  };

  // const selectCell = (row, col) => {
  //   let gridCopy = arrayClone(gridDisplay);
  //   //find exact cell that was clicked then set to opposite
  //   gridCopy[row][col] = !gridDisplay[row][col];
  //   setGridDisplay(gridCopy);
  //   // console.log("SELECTED", gridCopy[row][col])
  //   console.log("SELECTED", gridDisplay)
  // }


  const randomCells = () => {

    //set up copy of grid
    let gridCopy = arrayClone(gridDisplay);
    //nested for loops iterate through grid decide state of each cell
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        //assign grid buffer to 50% random cell selection
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true
        }
        // gridCopy[i][j] = Math.floor(Math.random() * 2)
      }
    }
    console.log("SET GRID DISPLAY", gridDisplay)
    setGridDisplay(gridCopy)
    // return gridCopy
  }

  // useEffect initiates state with random alive and dead cells
  useEffect(() => {
    console.log('random ceeeells', gridDisplay)
    return (startButton())
  }, [])


  let startButton = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
      runningRef.current = true;
      // start()
      // setTimeout(start, 1000)
      console.log("please work", gridDisplay)
    } else {
      setIsRunning(false)
    }
  })

  let stopButton = () => {
    let id = setInterval(interval);
    setInterval(id);
    return clearInterval(id);
  }

  //set grid to initial new array, set generations back to zero
  let reset = () => {
    let grid = new Array(rows).fill().map(() => new Array(cols).fill(false));
    setGridDisplay(grid)
    setGeneration(0)
  }
  //set speed to 1000
  let slow = () => {
    speed = 1000;
    startButton();
  }
  //set speed to 100
  let fast = () => {
    speed = 100;
    startButton();
  }



  const runningRef = useRef(isRunning);
  runningRef.current = isRunning


  //function that starts the game, sets the edge cases
  //accounts for neighbors, sets game logic based off neighbors
  const start = useCallback(() => {
    if (!isRunning.current) {
      return;
    }
    setGridDisplay((gridDisplay => {
      return selectCell(gridDisplay, gridCopy => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let aliveNeighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols) {
                aliveNeighbors += gridDisplay[newI][newJ];
              }
            });
            if (aliveNeighbors < 2 || aliveNeighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (gridDisplay[i][j] === 0 && aliveNeighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(start, 1000);
  }, []);


  return (
    <div className="App">
      <div className="star-contianer">
        {/* <div className="starlite"><img src={triangles} alt="" style={{ width: "300px", zIndex: "9", top: "15px" }} /></div> */}
        <div className="title"><h2>Conway's Game of Life</h2></div>
        {/* <div className="starlite"><img src={triangles} alt="" style={{ width: "300px" }} /></div> */}
      </div>
      <div className="components">
        <Grid gridDisplay={gridDisplay} rows={rows} cols={cols} selectCell={selectCell} />
        <Buttons startButton={startButton} stopButton={stopButton} reset={reset} slow={slow} fast={fast} randomCells={randomCells} isRunning={isRunning} runningRef={runningRef} />
        <Modal />
      </div>
      <div><h3 className="title">Generations: {generation}</h3></div>
    </div>
  );
}

//function to clone 2d arrays
let arrayClone = (arr) => {
  //set to string and parse clone arrays inside of arrays
  return JSON.parse(JSON.stringify(arr));
}

export default App;


