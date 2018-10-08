import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Game from './pages/Game';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/game" component={Game}/>
    </div>
  </Router>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
