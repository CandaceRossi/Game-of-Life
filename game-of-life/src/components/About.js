import React from 'react';

function About() {
    return (
        <div className="About">
            <h3>About This Algorithm:</h3>
            <p>The Game of Life is a cellular-automaton, zero player game,
developed by John Conway in 1970. The game is played on an
infinite grid of square cells, and its evolution is only determined by
its initial state.</p>
            <p>The rules of the game are simple, and describe the evolution of the
grid:
◮ Birth: a cell that is dead at time t will be alive at time t + 1
if exactly 3 of its eight neighbors were alive at time t.
◮ Death: a cell can die by:
◮ Overcrowding: if a cell is alive at time t + 1 and 4 or more of
its neighbors are also alive at time t, the cell will be dead at
time t + 1.
◮ Exposure: If a live cell at time t has only 1 live neighbor or no
live neighbors, it will be dead at time t + 1.
◮ Survival: a cell survives from time t to time t + 1 if and only
if 2 or 3 of its neighbors are alive at time t.</p>

            <p>Starting from the initial configuration, these rules are applied, and
the game board evolves, playing the game by itself!
This might seem like a rather boring game at first, but there are
many remarkable facts about this game. Today we will see the
types of “life-forms” we can create with this game, whether we can
tell if a game of Life will go on infinitely, and see how a game of
Life can be used to solve any computational problem a computer
can solve.</p>

        </div>
    );
}

export default About;
