import React from 'react';

const Buttons = (props) => {

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
                <button className="btn-style" onClick={() => {
                    props.setNumRows(35)
                    props.setNumCols(35)
                }}>
                    {props.numRows && props.numCols ? "Bigger" : "Smaller"}
                </button>
                <button className="btn-style" onClick={props.slow}>
                    Slow
            </button>
                <button className="btn-style" onClick={props.fast}>
                    Fast
            </button>
                <button className="btn-style" onClick={props.randomCells}>
                    Random Input
            </button></div>

        </>
    )
}
export default Buttons;
