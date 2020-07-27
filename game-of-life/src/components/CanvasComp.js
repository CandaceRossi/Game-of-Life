import React, { useRef, useState } from "react";
import { useAnimeFrame } from "../customHooks/useAnimeFrame.js";
import moment from "moment";

const {Provider, Consumer} = React.createContext();

const CanvasComp = (props) => {

    const canvasRef = useRef(null);

    const [stopAnimation, setStopAnimation] = useState(false);

    const doAnimation = (elapsedTime) => {
        console.log("elapsed time:", elapsedTime);
        console.log(canvasRef.current);
    };

    const [cancelAnimationFrame] = useAnimeFrame(moment.now(), doAnimation);

    const requestAnimationFrame = () => {
        const canvas = getElementById("canvas-img");
        const context = canvas.getContext("2d");
    }
    return (
        <Provider value={{ stopAnimation }}> {props.children}
            <div>
                <canvas id="canvas-img" ref={canvasRef} width={props.width} height={props.height}> </canvas>
            </div>
        </Provider>
    )
}


export const Alive = C => props => (
    <Consumer> {value => <C {...value} {...props} />}</Consumer>
);

export default CanvasComp;