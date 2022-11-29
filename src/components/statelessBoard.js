import React, {useCallback, useEffect, useState} from 'react';
import TimerHook from '../tools/hooks';
import { BOARD } from '../tools/tools';

let matrix = BOARD();
let row_stateless = 0
let pointer_stateless = 0;

function StatelessBoard(){

  const [handle, setHandle] = useState({});

  const handleKeyDown = useCallback((e) => {
    console.log(e.key)
    if(pointer_stateless >= 0 && pointer_stateless < 5) {
      matrix[row_stateless][pointer_stateless] = e.key;
      pointer_stateless++;
    } else pointer_stateless = 0;
    setHandle({});
  },[])

  useEffect(() => {
    console.log('matrix')
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [handleKeyDown]);

  if(!handle) return null;
  return (
    <>
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
        <TimerHook 
            matrix={matrix}
            row_stateless={row_stateless}
            pointer_stateless={pointer_stateless}
        />
    </>
  )
}

export default StatelessBoard;