import classes from './View.module.css';
import { useRef, useEffect } from 'react';
import { renderView } from './platapi';

export default function View( {objects}: {objects:{pos: number[], color: number[]}[]}) {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if( !canvas ) throw ("No referance to the canvas element!");

        renderView(canvas, objects);
    });

    return (
        <canvas ref={canvasRef} className={classes.view}></canvas>
    )
}