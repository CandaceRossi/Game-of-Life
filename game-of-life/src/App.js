import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from 'immer';
// import Grid from './components/Grid';
import Buttons from './components/Buttons';
import Modal from './components/Modal';
// import triangles from '../src/images/triangles.jpg';
import './App.scss';


// const numRows = 25;
// const numCols = 25;

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

const App = () => {

  // asign state to array for row and array for col - fill initial state with zeros
  const [numRows, setNumRows] = useState(25);
  const [numCols, setNumCols] = useState(25);
  const [gridSize, setGridSize] = useState(25);
  const [gridDisplay, setGridDisplay] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows
  });
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeInterval, setTimeInterval] = useState(200);
  const timeIntervalRef = useRef();
  timeIntervalRef.current = timeInterval;
  const gridSizeRef = useRef();
  gridSizeRef.current = gridSize;

  const useInterval = (callback, delay, started) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      let id = null;
      if (delay !== null && started) {
        id = setInterval(tick, delay);
        return () => {
          clearInterval(id);
        };
      } else {
        if (id) {
          clearInterval(id);
        }
      }
    }, [callback, delay, started]);
  };


  const randomCells = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => Math.random() > 0.7 ? 1 : 0));
    }
    setGridDisplay(rows)
  }

  //set grid to initial new array, set generations back to zero
  const reset = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    setGridDisplay(rows)
    setGeneration(0)
  }

  //function that starts the game, sets the edge cases
  //accounts for neighbors, sets game logic based off neighbors
  const start = useCallback(() => {

    setGridDisplay((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            // setGeneration(generation + 1)
            let aliveNeighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                aliveNeighbors += g[newI][newJ];
              }

            })
            if (aliveNeighbors < 2 || aliveNeighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && aliveNeighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
        setGeneration((g) => g + .5)
      });
    });
  }, []);

  useInterval(
    () =>
      start(),
    timeIntervalRef.current, isRunning
  );

  return (
    <div className="App">
      <h2>Conway's Game of Life</h2>
      <div className="components">
        <div className="grid" style={{
          width: "510px",
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}>
          {gridDisplay.map((rows, i) =>
            rows.map((col, j) =>

              <div
                className="cell"
                key={`${i}` - `${j}`}
                onClick={() => {
                  const newGrid = produce(gridDisplay, gridCopy => {
                    if (!isRunning) {
                      gridCopy[i][j] = gridDisplay[i][j] ? 0 : 1;
                    }

                  })
                  setGridDisplay(newGrid);
                }}

                style={
                  gridDisplay[i][j] ? { "margin": "0 auto", "width": 0, "height": 0, "borderLeft": "7px solid transparent", "borderRight": "7px solid transparent", "borderBottom": "15px solid rgb(84, 114, 204)" } : undefined
                }
              />
            ))}
        </div>
        <Buttons
          setIsRunning={setIsRunning} isRunning={isRunning}
          randomCells={randomCells} reset={reset} numRows={numRows}
          setNumRows={setNumRows} numCols={numCols} setNumCols={setNumCols}
          setGridSize={setGridSize} gridSize={gridSize}
          timeInterval={timeInterval} setTimeInterval={setTimeInterval} />
        <Modal />
      </div>
      <h3>Generations: {generation}</h3>
    </div>
  )
}


export default App;

