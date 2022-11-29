import React, {useCallback, useEffect, useRef, useState} from 'react';
import { ALPHABET, BOARD } from '../tools/tools';

let matrix = BOARD();
let row_stateless = 0
let pointer_stateless = 0;

function StatelessBoard(){

    const [handle, setHandle] = useState({});
    const timerStateless = useRef(1);

    const handleKeyDown = useCallback((e) => {
        console.log(e.key)
        if(pointer_stateless >= 0 && pointer_stateless < 5) {
            matrix[row_stateless][pointer_stateless] = e.key;
            pointer_stateless++;
        } else pointer_stateless = 0;
        setHandle({});
    },[])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if(pointer_stateless === 0) {
            timerStateless.current = setInterval(() => {
                console.log(pointer_stateless)
                matrix[row_stateless][pointer_stateless] = ALPHABET[pointer_stateless];
                setHandle({});
                pointer_stateless++;
                if(pointer_stateless > 4) clearInterval(timerStateless.current);
            },1000)
        }
        return () => {
            clearInterval(timerStateless.current);
        }
    },[]);

    if(!handle) return null;

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