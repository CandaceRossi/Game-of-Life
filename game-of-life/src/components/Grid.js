import React from 'react';
import Cell from "./Cell";


function Grid(props) {
    //sets the width of grid
    const width = (props.cols * 14);
    //array that stores the loop of cell objects
    let collectedArr = [];
    //empty string for the class to take ternary
    let cellClass = "";
    //nested for loop to generate rows and cols
    for (let i = 0; i < props.rows; i++) {
        for (let j = 0; j < props.cols; j++) {
            //id generated iteratively
            let cellId = i + "_" + j;
            //assign cell class to display dependant on alive or dead ternary
            cellClass = props.gridDisplay[i][j] ? "cell alive" : "cell dead";
            //push cell object into generated grid 
            collectedArr.push(
                <Cell
                    cellClass={cellClass}
                    //assign key to generated id
                    key={cellId}
                    cellId={cellId}
                    row={i}
                    col={j}
                    selectCell={props.selectCell}
                />
            );
        }
    }
    return (
        //include dynamic width inline and return grid
        <div className="grid" style={{ width: width }}>
            {collectedArr}
        </div>
    );
}

export default Grid;
