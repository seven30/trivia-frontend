import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { classicModeFetch, triviaFetch } from '../api/trivia-api.js'
import GameCard from '../components/GameCard';
import Timer from '../components/timer.js'
import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';
import AuthService from '../services';
import { createGameHistory } from '../api/game-history-api';
import Game from './Game';

const CATEGORIES = {
  "0": "Random",
  "9": "General Knowledge",
  "10": "Entertainment: Books",
  "11": "Entertainment: Film",
  "12": "Entertainment: Music",
  "13": "Entertainment: Musicals & Theatres",
  "14": "Entertainment: Television",
  "15": "Entertainment: Video Games",
  "16": "Entertainment: Board Games",
  "17": "Science & Nature",
  "18": "Science: Computers",
  "19": "Science: Mathematics",
  "20": "Mythology",
  "21": "Sports",
  "22": "Geography",
  "23": "History",
  "24": "Politics",
  "25": "Art",
  "26": "Celebrities",
  "27": "Animals",
  "28": "Vehicles",
  "29": "Entertainment: Comics",
  "30": "Science: Gadgets",
  "31": "Entertainment: Japanese Anime & Manga",
  "32": "Entertainment: Cartoon & Animations",
}

const styles = theme => ({
  container: {
    // display: 'inline-flex',
    // flexDirection: 'column',
    // flexGrow: 1,
    minHeight: '100vh',
    minWidth: '100vw',
  },
  button: {
    width: '30vw',
    minWidth: '50px',
    height: 'auto',
    minHeight: '10vh',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
})

class GameModes extends Component {
  constructor(props){
    super(props)
    this.state = {
      category: {},
      categorySelected: false,
    }
  }

  startGame(){
    let category = this.state.category;
    console.log(category);
    this.props.history.push({
      pathname: '/game',
      state: {
        num: 10,
        category: category,
        difficulty: ""
      }
    })
  }

  setCategory(categoryNum, categoryName){
    console.log(categoryNum);
    let category = { [categoryNum] : categoryName}
    this.setState({category: category, categorySelected: true})
  }

  render(){
    const { classes } = this.props;
    console.log(Object.entries(CATEGORIES));
    console.log("state in mode", this.state);
    let categories =  Object.entries(CATEGORIES).map((category, i) => {
      let btn_type = category[1] === Object.values(this.state.category)[0] ? "contained" : "outlined";
      return (
        <Button className={classes.button} variant={btn_type} color="primary" onClick={this.setCategory.bind(this, category[0], category[1])}>{category[1]}</Button>
      )
    })
    if(this.state.categorySelected){
      return (
        <div className={classes.container}>
          <Button className={classes.button} color="secondary" variant="contained" onClick={this.startGame.bind(this)}>Start Game</Button>
          <div>
            {categories}
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes.container}>
          <Button className={classes.button} color="secondary" variant="outlined">Select Category</Button>
          <div>
            {categories}
          </div>
        </div>
      )
    }
  }
}

export default withStyles(styles)(GameModes);
