import React from 'react';

const Buttons = (props) => {
    const toggleSpeed = () => {
        if (props.timeInterval < 600) {
            props.setTimeInterval(600)
        } else {
            props.setTimeInterval(200)
        }
    }
    const toggleSize = () => {
        if (props.gridSize < 35) {
            props.setNumRows(35)
            props.setNumCols(35)
            props.setGridSize(35)
        } else {
            props.setNumRows(25)
            props.setNumCols(25)
            props.setGridSize(25)
        }
    }
    return (
        <>
            <div className="btn-display">
                <button className="btn-style" onClick={() => {
                    props.setIsRunning(!props.isRunning)
                }}>
                    {props.isRunning ? "stop" : "start"}
                </button>
                <button className="btn-style" onClick={props.reset} >
                    Reset
            </button>
                <button className="btn-style" onClick={toggleSize}>
                    {props.gridSize ? "Bigger" : "Smaller"}
                </button>
                <button className="btn-style" onClick={toggleSpeed}>
                    {props.timeInterval < 600 ? "Slower" : "Faster"}
                </button>
                <button className="btn-style" onClick={props.randomCells}>
                    Random Input
            </button></div>

        </>
    )
}
export default Buttons;
