import React, {useCallback, useEffect, useRef, useState} from 'react';
import { ALPHABET, BOARD, QUEUE } from '../tools/tools';

let matrix,
    queue,
    pointer_stateless

function StatelessBoard({rowSettings, colSettings, testsActive}){

    const [handle, setHandle] = useState(null);
    const page = useRef(null);
    
    const handleKeyDown = useCallback((e) => {
        if(!queue.length) return;
        const index = e.key.toLowerCase().charCodeAt(0) - 97;
        if(ALPHABET[index] !== e.key.toUpperCase()) return;
        if(pointer_stateless >= 0 && pointer_stateless < (colSettings || 5)) {
            matrix[queue[0]][pointer_stateless] = ALPHABET[index];
            pointer_stateless++;
            if(pointer_stateless > ((colSettings -1) || 4) ) {
                queue.shift();
                pointer_stateless = 0;
            }
        } 
        setHandle({});
    },[colSettings])

    useEffect(() => {
        if(!page.current) {
            page.current = document;
            if(!testsActive) page.current.addEventListener('keydown', handleKeyDown, true);
            matrix = BOARD(rowSettings,colSettings);
            queue = QUEUE(rowSettings);
            pointer_stateless = 0;
            setHandle({});
        }
        return () => {
            page.current.removeEventListener('keydown', handleKeyDown, true);
            page.current = null;
        }
    }, [handleKeyDown, testsActive, rowSettings, colSettings]);

    useEffect(() => {
        if(!testsActive) return;
        const intervalId = setInterval(() => {
            console.log(pointer_stateless)
            if(pointer_stateless > ((colSettings -1) || 4) ) {
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
    },[testsActive, colSettings]);

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