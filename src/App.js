import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthService from './services'
import Register from './pages/Register.js';
import Home from './pages/Home.js';
import Game from './pages/Game.js';
import Login from './pages/Login.js';
import LoginButton from './components/LoginButton';

class App extends Component {
  render() {
  //new instance of AuthService
  let auth = new AuthService()

    return (
      <div className="App">
      </div>
    );
  }
}

export default App;

// <Router>
//   {(auth.loggedIn())
//   //if logged in
//   ? <Switch>
//     <Route exact path='/' component={Home} / >
//     <Route exact path='/game' component={Game} / >
//   </Switch>
//   //if not logged in
//   : <Switch>
//     <Route exact path='/' component={Home} / >
//     <Route exact path='/login' component={Login} / >
//     <Route exact path='/register' component={Register} / >
//     <Route exact path='/gameguest' component={Game} / >
//     <Redirect from='/game' to='/Login' / >
//   </Switch>
// }
// </Router>
