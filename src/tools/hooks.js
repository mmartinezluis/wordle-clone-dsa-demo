import  React, {useCallback, useEffect, useRef} from 'react';
import { ALPHABET } from './tools';

export default function TimerHook({
    mode="stateless", 
    row,
    pointer, 
    board,
    setBoard, 
    setPointer,
    row_stateless,
    pointer_stateless,
    matrix
}) {

    const timerId = useRef(1);

    const timerStateless = useRef(2);

    const updateStatefull = useCallback((pointer, boardCallback, pointerCallback) => {
        if(timerId.current !== 1) return;
        timerId.current = setInterval(() => {
            const clone = [...board]
            console.log(pointer)
            clone[row][pointer] = ALPHABET[pointer];
            boardCallback(clone);
            pointerCallback((prev) => prev + 1);
        },1000)
    },[board, row])

    const updateStateless = useCallback(() => {
        if(timerStateless.current !== 2) return;
        timerStateless.current = setInterval(() => {
            console.log(pointer_stateless)
            matrix[row_stateless][pointer_stateless] = ALPHABET[pointer_stateless];
            pointer_stateless++;
            if(pointer_stateless > 4) clearInterval(timerStateless.current);
        },1000)
    },[matrix, pointer_stateless, row_stateless])

    useEffect(() => {
        if(pointer === 0) {
            if(mode === "statefull") {
                updateStatefull(pointer, setBoard, setPointer);
            } 
        }
        return () => {
            if(pointer > 3) clearInterval(timerId.current);
        }
    },[updateStatefull, pointer, mode, setBoard, setPointer]);

    useEffect(() => {
        if(pointer_stateless === 0) {
            if(mode === "stateless") {
                updateStateless()     
            } 
        }
        return () => {
            // if(pointer_stateless > 3) clearInterval(timerStateless.current);
            clearInterval(timerStateless.current);
        }
    },[updateStateless, matrix, mode, pointer_stateless]);

    return <></>
}