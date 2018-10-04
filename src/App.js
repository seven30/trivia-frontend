import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './pages/Register.js';
import Home from './pages/Home.js';
import Game from './pages/Game.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/game' component={Game}/>
            <Route path='/register' component={Register}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
