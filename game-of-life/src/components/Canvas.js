import React, { useEffect, useState, useRef } from "react";
import moment from "moment";


// custom hook for using animation frame
export const useAnimeFrame = (timestamp, doAnimationCallBack) => {

    // set the prev time stamp
    const [prevTimeStamp, setTimeStamp] = useState(timestamp - 30);
    const [continueAnimation, setContinueAnimation] = useState(true);
    const [started, setStarted] = useState(false);

    useEffect(() => {

        // only start the animation frame if we haven't in the past
        if (!started) {
            setStarted(true);
            requestAnimationFrame(onFrame);
        }
    }, [started]);

    // Request the first animation frame to kick things off
    const onFrame = (timestamp) => {

        // if we want to do more ask for the next frame
        if (continueAnimation) {
            requestAnimationFrame(onFrame);
        }
        const elapsed = prevTimeStamp - timestamp;
        setTimeStamp(timestamp);
        console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

        //call callback and pass it the elapsed time
        doAnimationCallBack(elapsed);

    };

    // this wills stop the hook from calling the next animation frame
    const cancelAnimation = () => {
        setContinueAnimation(false);
    };

    return [cancelAnimation];

};

const Canvas = (props) => {

    const canvasRef = useRef(null);

    const [stopAnimation, setStopAnimation] = useState(false);

    const doAnimation = (elapsedTime) => {
        console.log("elapsed time:", elapsedTime);
        console.log(canvasRef.current);
    };

    const [cancelAnimationFrame] = useAnimeFrame(moment.now(), doAnimation);

    /**
     * Render the canvas
     */
    return (<canvas ref={canvasRef} width={props.width}
        height={props.height} />);
};

export default Canvas;