import React, {useCallback, useEffect, useRef, useState} from 'react';
import { ALPHABET, BOARD, QUEUE } from '../tools/tools';

let matrix
let queue 
let pointer_stateless

function StatelessBoard(props){

    const [handle, setHandle] = useState(null);
    const page = useRef(null);
    
    const handleKeyDown = useCallback((e) => {
        console.log(e.key)
        if(pointer_stateless >= 0 && pointer_stateless < (props.colSettings || 5)) {
            matrix[queue[0]][pointer_stateless] = e.key;
            pointer_stateless++;
        } else pointer_stateless = 0;
        setHandle({});
    },[props.colSettings])

    useEffect(() => {
        if(!page.current) {
            page.current = document;
            page.current.addEventListener('keydown', handleKeyDown, true);
            matrix = BOARD(props.rowSettings, props.colSettings);
            queue = QUEUE(props.rowSettings);
            pointer_stateless = 0;
            setHandle({})
        }
        return () => {
            page.current.removeEventListener('keydown', handleKeyDown, true);
            page.current = null;
        }
    }, [handleKeyDown, props.rowSettings, props.colSettings]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log(pointer_stateless)
            if(pointer_stateless > ((props.colSettings -1) || 4) ) {
                queue.shift();
                pointer_stateless = 0;
                if(!queue.length) {
                    clearInterval(intervalId);
                    return;
                }
            }
            matrix[queue[0]][pointer_stateless] = ALPHABET[pointer_stateless];
            pointer_stateless++;
            setHandle({});
        },500)
        return () => clearInterval(intervalId);
    },[props.colSettings]);

    if(!handle || !page.current) return null;

    return (
        <div className='matrix'>
            {matrix.map((row, rowIndex) => {
                return (
                <div className='row' key={rowIndex}>
                    {row.map((col, colIndex) => {
                        return (
                            <div className='cell' key={parseInt("" + rowIndex + colIndex)}>
                                {col}
                            </div>
                        )
                    })}
                </div>
                )
            })}
        </div>
    )
}

export default StatelessBoard;