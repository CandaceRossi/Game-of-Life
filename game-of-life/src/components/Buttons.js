import React from 'react';

const Buttons = (props) => {
    const toggleSpeed = () => {
        if (props.timeInterval < 1000) {
            props.setTimeInterval(1000)
        } else {
            props.setTimeInterval(300)
        }
    }
    const toggleSize = () => {
        if (props.gridSize > 25) {
            props.setNumRows(25)
            props.setNumCols(25)
        } else {
            props.setNumRows(35)
            props.setNumRows(35)
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
                    {(props.numRows && props.numCols) ? "Bigger" : "Smaller"}
                </button>
                <button className="btn-style" onClick={toggleSpeed}>
                    {props.timeInterval < 1000 ? "Faster" : "Slower"}
                </button>
                <button className="btn-style" onClick={props.randomCells}>
                    Random Input
            </button></div>

        </>
    )
}
export default Buttons;
