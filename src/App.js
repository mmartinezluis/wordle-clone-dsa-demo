import { Profiler, useRef } from 'react';
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import StatefullBoard from './components/statefullBoard';
import StatelessBoard from './components/statelessBoard';
import Home from './components/Home';
import { testSettings } from './performanceTests/config';


export default function App() {

  const renderCount = useRef(0);
  const averageRenderTime= useRef(0);
  const testsActive = useRef(false);
  const currentSettings = useRef(testSettings.grid.normal);
  const currentOption = useRef("normal");

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

    const gridSize = currentSettings.current[0]*currentSettings.current[1];

    // skip the render time for the component mount phase
    if(renderCount.current > 0) averageRenderTime.current = averageRenderTime.current + baseTime;
    if(renderCount.current - 1 === gridSize) {
      console.log(`Average rerender time for 100 rerenders: ${averageRenderTime.current/gridSize}ms`);
    }
    renderCount.current = renderCount.current + 1;
    console.log(averageRenderTime)
  }

  const resetTests = () => {
    renderCount.current = 0;
    averageRenderTime.current = 0;
  }

  const runTests = () => {
    testsActive.current = true;
  }

  return (
    <div className="App">
      <Navbar />
      <div>
        <button>Activate</button>
        <div>
          <input 
            type="radio" 
            value="normal" 
            checked={currentOption.current === "normal"} 
            onChange={() => currentOption.current = "normal"}
          />Normal grid (6X5) (30 rerenders)
          <input 
            type="radio" 
            value="medium"
            checked={currentOption.current === "medium"} 
            onChange={() => currentOption.current = "medium"}
          />Medium grid (10X10) (100 rerenders)
          <input 
            type="radio" 
            value="large" 
            checked={currentOption.current === "large"} 
            onChange={() => currentOption.current = "large"}
          />Large grid (20x10) (200 rerenders)
        </div>
      </div>
      {testsActive ? (
        <Routes>
          <Route path="/statefull" element={<Profiler id="STATEFULL board component" onRender={renderCallback}>
                                              <StatefullBoard />
                                            </Profiler>
                                            }/>
          <Route path="/stateless" element={<Profiler id="STATELESS board component" onRender={renderCallback}> 
                                              <StatelessBoard 
                                                rowSettings = {currentSettings.current[0]}
                                                colSettings = {currentSettings.current[1]}
                                              />
                                            </Profiler>} />
          <Route path="/" element={<Home />}/>
        </Routes>
      ): (
        <Routes>
          <Route path="/statefull" element={<StatefullBoard />}/>
          <Route path="/stateless" element={<StatelessBoard />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      )}
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









