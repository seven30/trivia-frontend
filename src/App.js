import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthService from './services'
import Register from './pages/Register.js';
import Home from './pages/Home.js';
import Game from './pages/Game.js';
import Login from './pages/Login.js';
import Header from './components/Header';

class App extends Component {
  render() {
  //new instance of AuthService
  let auth = new AuthService()

    return (
      <div className="App">
        <Router>
          {(auth.loggedIn())
          //if logged in
          ? <Switch>
            <Route exact path='/' component={Home} / >
            <Route exact path='/game' component={Game} / >
          </Switch>
          //if not logged in
          : <Switch>
            <Route exact path='/login' component={Login} / >
            <Route exact path='/register' component={Register} / >
            <Redirect from='/game' to='/Login' / >
          </Switch>
        }
        </Router>
      </div>
    );
  }
}

export default App;
