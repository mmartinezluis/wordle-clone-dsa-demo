import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Navbar />
      <Routes>
        <Route path="/statefull" element={<StatefullBoard />} />
        <Route path="/stateless" element={<StatelessBoard />} />
        <Route path="/home" element={<Home />}/>
      </Routes>
      {/* </header> */}
    </div>
  );
}
// 

function Navbar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px 0 40px'}}>
      <NavLink to="/statefull">Using state variables</NavLink>
      <NavLink to="/stateless">Using stateless variables</NavLink>
      <NavLink to="/home">Home</NavLink>
    </div>
  )
}

const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const BOARD = () => Array.from({length: 6}, () => Array.from({length: 5}, () => ""));
let row = 0;
let pointerX = 0;


function StatefullBoard(){
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


let matrix = BOARD();
let row_2 = 0
let pointer2 = 0;

function StatelessBoard(){

  const [handle, setHandle] = useState(null);

  const handleKeyDown = useCallback((e) => {
    console.log(e.key)
    if(pointer2 >= 0 && pointer2 < 5) {
      matrix[row_2][pointer2] = e.key;
      pointer2++;
    } else pointer2 = 0;
    setHandle({});
  },[])

  useEffect(() => {
    console.log('matrix')
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [handleKeyDown]);

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


function Home() {
  return (
    <>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </>
  )
}