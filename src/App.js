import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home';
import Meeting from './pages/Meeting';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/meeting/:id" component={Meeting} />
      </Router>
    </div>
  );
}

export default App;
