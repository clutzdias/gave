import React, {Component} from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Menu from './Menu';
//import 'styles/App.css';

function App() {
  return (
    <Router>
      <div>
          <Menu/>
          <Routes/>
      </div>
    </Router>
  );
}

export default App;
