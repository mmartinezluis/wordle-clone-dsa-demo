import React, { useEffect } from 'react';
// import logo from '../logo.svg';

function TestsInterface({resetTests}) {
    useEffect(() => {
      if(resetTests) resetTests();
    },[resetTests])
    return (
      <>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </>
    )
}
export default TestsInterface;
