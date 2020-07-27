import React from 'react';

function Cell(props) {
    return (
        <div className={props.cellClass} id={props.cellId}> </div>
    );
}

export default Cell;
