import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
// import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
// import StudentHome from './components/StudentHome';
// import AdminHome from './components/AdminHome';
// import ShowSchedule from './components/ShowSchedule';
import React from 'react';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Login />
      </BrowserRouter>        
    </div>
  );
}


export default App;