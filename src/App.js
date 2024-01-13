// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element = {<Landing/>}/>
        <Route path="/Dashboard" element = {<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
