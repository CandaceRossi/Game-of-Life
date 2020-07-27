import React from 'react';

function Cell(props) {
    let selectCell = () => { 
    props.selectCell(props.row, props.col)
    }
    return (
        <div className={props.cellClass} id={props.cellId} onClick={selectCell}> </div>
    );
}

export default Cell;
