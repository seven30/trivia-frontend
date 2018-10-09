import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { classicModeFetch, triviaFetch } from '../api/trivia-api.js'
import GameCard from '../components/GameCard';
import Timer from '../components/timer.js'
import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';
import AuthService from '../services';
import { createGameHistory } from '../api/game-history-api';
import Game from './Game';

class GameModes extends Component {
  constructor(props){
    super(props)
    this.state = {
      questions: []
    }
  }

  startGame(){
    this.props.history.push({
      pathname: '/game',
      state: {
        num: 10,
        category: 15,
        difficulty: "easy"
      }
    })
  }

  render(){
    console.log("state in mode", this.state);
    let { questions } = this.state;

    return (
      <div>
        <Button onClick={this.startGame.bind(this)} />
      </div>
    )
  }
}

export default GameModes;
