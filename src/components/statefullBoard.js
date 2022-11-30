import React, {useCallback, useEffect, useRef, useState} from 'react';
import { ALPHABET, BOARD, QUEUE } from '../tools/tools';

let queue = QUEUE();

function StatefullBoard() {

    const [pointer, setPointer] = useState(0)
    const pointerRef = useRef(0);
    const [board, setBoard ] = useState(BOARD());
    
    const onKeyDown = useCallback ((e) => {
      console.log(e.key)
      if(pointer >= 0 && pointer < 10) {
        const clone = structuredClone(board);
        clone[queue[0]][pointer] = e.key;
        setBoard(clone);
        setPointer(prev => prev + 1)
      } 
    },[board, pointer])
  
    useEffect(() => {
      document.addEventListener('keydown', onKeyDown, true);
      return () => document.removeEventListener('keydown', onKeyDown, true);
      
    },[onKeyDown]);

    useEffect(() => { 
        console.log('i run')
        const intervalId = setInterval(() => {
            pointerRef.current = pointerRef.current + 1;
            if(pointerRef.current > 10) {
                pointerRef.current = 1;
                queue.shift();
                if(!queue.length) {
                    clearInterval(intervalId);
                    return
                }
            }
            setBoard((prevBoard) => {
                const clone = structuredClone(prevBoard);
                clone[queue[0]][pointerRef.current -1] = ALPHABET[pointerRef.current -1];
                console.log(pointerRef.current -1)
                return clone;
            });
            
        },500)
        return () => clearInterval(intervalId);
    }, []);
    
    return (
      <div className='board'>
        {board.map((row, rowIndex) => {
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

export default StatefullBoard;