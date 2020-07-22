import React from 'react';
// import Canvas from "./components/Canvas";
import About from "./components/About";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Conway's Game of Life</h2>
      </header>
      {/* <Canvas /> */}
      <About />
    </div>
  );
}

export default App;
