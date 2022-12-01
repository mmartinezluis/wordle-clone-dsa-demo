import { Profiler, useCallback, useRef, useState } from 'react';
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import StatefullBoard from './components/StatefullBoard';
import StatelessBoard from './components/StatelessBoard';
import TestsInterface from './components/TestsInterface';
import { testSettings } from './performanceTests/config';


export default function App() {

  const renderCount = useRef(0);
  const averageRenderTime= useRef(0);
  const [testsActive, setTestsActive] = useState(false);
  const currentSettings = useRef(testSettings.grid.normal);
  const testOptions = useRef([]);

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
      console.log(`Average rerender time for ${gridSize} rerenders: ${averageRenderTime.current/gridSize}ms`);
    }
    renderCount.current = renderCount.current + 1;
    console.log(averageRenderTime)
  }

  const resetTests = useCallback(() => {
    renderCount.current = 0;
    averageRenderTime.current = 0;
    setTestsActive(() => true);
  },[])

  const turnOffTests = () => {
    setTestsActive(() => false)
  }
  
  const handleCheckbox = (e) => {
    console.log(e.target.checked)
    e.target.checked ? resetTests() : turnOffTests();
  }

  const handleButtonChange = (e) => {
    testOptions.current.forEach(input => {
      if(input.value === e.target.value) {
        e.target.checked = true;
        currentSettings.current = testSettings.grid[e.target.value]
      } else input.checked = false;
    })
    console.log(currentSettings.current)
  }

  console.log(testsActive)

  const testsPanel =
      <div className='tests-panel'>
        <label>
        <input 
          type="radio" 
          value="normal" 
          onChange={handleButtonChange}
          ref={(el) => testOptions.current[0] = el}
        />Standard grid (6X5) (30 rerenders)
        </label>
        <label>
        <input 
          type="radio" 
          value="medium"
          onChange={handleButtonChange}
          ref={(el) => testOptions.current[1] = el}
        />Medium grid (10X10) (100 rerenders)
        </label>
        <label>
        <input 
          type="radio" 
          value="large" 
          onChange={handleButtonChange}
          ref={(el) => testOptions.current[2] = el}
        />Large grid (20x10) (200 rerenders)
        </label>
      </div>

  const testsCheckbox =
    <label>
      <input 
        type="checkbox"
        onChange={handleCheckbox}
      />Activate Tests
    </label>

  return (
    <div className="App">
      <Navbar />
      Mode: {testsActive ? "Test" : "Normal"}
      {testsActive ? (
        <>
          <Routes>
            <Route path="/statefull" element={<Profiler id="STATEFULL board component" onRender={renderCallback}>
                                                <StatefullBoard />
                                              </Profiler>
                                              }/>
            <Route path="/stateless" element={<Profiler id="STATELESS board component" onRender={renderCallback}> 
                                                <StatelessBoard 
                                                  rowSettings = {() => currentSettings.current[0]}
                                                  colSettings = {() => currentSettings.current[1]}
                                                  testsActive = {testsActive}
                                                />
                                              </Profiler>} />
            <Route path="/" element={
                <>
                  {testsCheckbox}
                  <TestsInterface 
                    resetTests={resetTests}
                  />
                  {testsPanel}
                </> 
            }/>
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/statefull" element={<StatefullBoard />}/>
          <Route path="/stateless" element={<StatelessBoard />}/>
          <Route path="/" element={
            <>
              {testsCheckbox}
              <TestsInterface />
            </>
          }/>
        </Routes>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px 0 40px'}}>
      <NavLink to="/statefull">Stateful Board</NavLink>
      <NavLink to="/stateless">Stateless Board</NavLink>
      <NavLink to="/">Tests Settings</NavLink>
    </div>
  )
}









