import React, { useEffect } from 'react';
import logo from '../logo.svg';

function Home({resetTests}) {
    useEffect(() => {
      if(resetTests) resetTests();
    },[resetTests])
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
export default Home;
