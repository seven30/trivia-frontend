import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';
import LoginButton from './components/LoginButton';
import GameModes from './pages/GameModes.js';
import UserDashboard from './pages/UserDashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Header from './components/Header'

import NewRegister from './pages/NewRegister'
//for font
// import WebFont from 'webfontloader';
// @import url(https://use.fontawesome.com/releases/v5.3.1/css/all.css);
//
// WebFont.load({
//    google: {
//      families: ['Titillium Web:300,400,700', 'sans-serif']
//    }
// });



const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/game" component={Game}/>
      <Route exact path="/selectgame" component={GameModes}/>
      <Route exact path="/dashboard" component={UserDashboard}/>

      <Route exact path="/register" component={NewRegister}/>


    </div>
  </Router>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
