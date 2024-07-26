import classes from './View.module.css';
import { useRef, useEffect } from 'react';
import { renderView } from './platapi';

export default function View({positions}: {positions: number[]}) {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if( !canvas ) throw ("No referance to the canvas element!");

        renderView(canvas, positions);
    });

    return (
        <canvas ref={canvasRef} className={classes.view}></canvas>
    )
}