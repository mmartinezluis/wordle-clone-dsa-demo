import React, {useCallback, useEffect, useRef, useState} from 'react';
import { ALPHABET, BOARD, QUEUE } from '../tools/tools';

function StatefulBoard({rowSettings, colSettings, testsActive}) {

    const [pointer, setPointer] = useState(0)
    const pointerRef = useRef(0);
    const [board, setBoard ] = useState(BOARD(rowSettings, colSettings));
    const queue = useRef(QUEUE(rowSettings))
    
    const onKeyDown = useCallback ((e) => {
      console.log(e.key)
      if(!queue.current.length) return;
      const index = e.key.toLowerCase().charCodeAt(0) - 97;
      if(ALPHABET[index] !== e.key.toUpperCase()) return;
      if(pointer >= 0 && pointer < (colSettings || 5)) {
        const clone = structuredClone(board);
        clone[queue.current[0]][pointer] = ALPHABET[index];
        setBoard(clone);
        setPointer(prev => prev + 1);
        if(pointer + 1 === (colSettings || 5)) {
          queue.current.shift();
          setPointer(() => 0)
        }
      } 
    },[board, pointer])
  
    useEffect(() => {
      if(testsActive) return;
      document.addEventListener('keydown', onKeyDown, true);
      return () => document.removeEventListener('keydown', onKeyDown, true);
    },[onKeyDown]);

    useEffect(() => { 
        if(!testsActive) return;
        const intervalId = setInterval(() => {
            pointerRef.current = pointerRef.current + 1;
            if(pointerRef.current > (colSettings || 5)) {
                pointerRef.current = 1;
                queue.current.shift();
                if(!queue.current.length) {
                    clearInterval(intervalId);
                    return;
                }
            }
            setBoard((prevBoard) => {
                const clone = structuredClone(prevBoard);
                clone[queue.current[0]][pointerRef.current -1] = ALPHABET[pointerRef.current -1];
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

export default StatefulBoard;