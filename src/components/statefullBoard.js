import React, {useCallback, useEffect, useRef, useState} from 'react';
import { ALPHABET, BOARD } from '../tools/tools';

let row = 0;

function StatefullBoard() {

    const pointer = useRef(0);
    const [board, setBoard ] = useState(BOARD());
    const timerId = useRef(11);

    const onKeyDown = useCallback ((e) => {
      console.log(e.key)
      if(pointer.current >= 0 && pointer.current < 5) {
        const clone = [...board];
        clone[row][pointer.current] = e.key;
        pointer.current = pointer.current + 1;
        setBoard(clone);
      } 
    },[board, pointer])
  
    useEffect(() => {
      document.addEventListener('keydown', onKeyDown, true);
      return () => {
        document.removeEventListener('keydown', onKeyDown, true);
      };
    },[onKeyDown]);

    useEffect(() => { 
        timerId.current = setInterval(() => {
            const clone = [...board];
            console.log(pointer.current)
            clone[row][pointer.current] = ALPHABET[pointer.current];
            setBoard(clone);
            pointer.current = pointer.current + 1;
            if(pointer.current > 4) clearInterval(timerId.current);
        },1000)
        return () => clearInterval(timerId.current);
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