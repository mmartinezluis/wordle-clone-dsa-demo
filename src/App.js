import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import StatefullBoard from './components/statefullBoard';
import StatelessBoard from './components/statelessBoard';
import Home from './components/Home';


export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Navbar />
      <Routes>
        <Route path="/statefull" element={<StatefullBoard />} />
        <Route path="/stateless" element={<StatelessBoard />} />
        <Route path="/" element={<Home />}/>
      </Routes>
      {/* </header> */}
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









