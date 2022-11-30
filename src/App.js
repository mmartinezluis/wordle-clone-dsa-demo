import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import StatefullBoard from './components/statefullBoard';
import StatelessBoard from './components/statelessBoard';
import Home from './components/Home';
import { Profiler } from 'react';

let renderCount = 0;
let averageRenderTime = 0;
export default function App() {

  const renderCallback = (
    id,
    phase,
    actualTime,
    baseTime,
    startTime,
    commitTime
  ) => {
    console.log(`${id}'s ${phase} phase:`)
    console.log(`Actual time: ${actualTime}`)
    console.log(`Base time: ${baseTime}`)
    console.log(`Start time: ${startTime}`)
    console.log(`Coomit time: ${commitTime}`)

    renderCount++
    averageRenderTime += baseTime;
    // substract the component mount time from the first render
    if(renderCount === 1) averageRenderTime -= baseTime;
    if(renderCount === 201) {
      console.log(`Average rerender time for 100 rerenders: ${averageRenderTime/200}ms`);
    }
  }

  return (
    <div className="App">
      <Navbar />
      {/* <Routes>
        <Route path="/statefull" element={<StatefullBoard />}/>
        <Route path="/stateless" element={<StatelessBoard />}/>
        <Route path="/" element={<Home />}/>
      </Routes> */}

      {/* For component analytics */}
      <Routes>
        <Route path="/statefull" element={<Profiler id="STATEFULL board component" onRender={renderCallback}>
                                            <StatefullBoard />
                                          </Profiler>
                                          }/>
        <Route path="/stateless" element={<Profiler id="STATELESS board component" onRender={renderCallback}> 
                                            <StatelessBoard />
                                          </Profiler>} />
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}


function Navbar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px 0 40px'}}>
      <NavLink to="/statefull">Using state variables</NavLink>
      <NavLink to="/stateless">Using stateless variables</NavLink>
      <NavLink to="/">Home</NavLink>
    </div>
  )
}









