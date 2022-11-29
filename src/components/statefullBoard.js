import React, {useCallback, useEffect, useRef, useState} from 'react';
import { ALPHABET, BOARD } from '../tools/tools';

let row = 0;
let pointerX = 0;

function StatefullBoard() {
    
    const [pointer, setPointer] = useState(0);
    const [board, setBoard ] = useState(BOARD());

    const onKeyDown = useCallback ((e) => {
      console.log(e.key)
      console.log('board')
      if(pointer >= 0 && pointer < 5) {
        const clone = [...board];
        clone[row][pointer] = e.key;
        // pointer++;
        setBoard(clone);
      } 
      // else pointer = 0;
    },[board, pointer])
  
    const timerId = useRef(1);
  
    const updateBoard = useCallback((pointer) => {
      if(timerId.current !== 1) return;
      timerId.current = setInterval(() => {
        const clone = [...board];
        console.log(pointer)
        clone[row][pointerX] = ALPHABET[pointerX];
        setBoard(clone);
        setPointer((prev) => prev + 1);
        pointerX++;
        // pointer++;
      },2000)
    },[board])
  
    console.log("hi")
    useEffect(() => {
      // document.addEventListener('keydown', onKeyDown, true);
      // return () => {
      //   document.removeEventListener('keydown', onKeyDown, true);
      // };
      if(pointer === 0) updateBoard(pointer);
      return () => {
        if(pointerX > 2) clearInterval(timerId.current);
      }
    },[updateBoard, pointer]);
    
  
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