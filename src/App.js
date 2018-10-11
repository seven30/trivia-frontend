import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthService from './services'


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
