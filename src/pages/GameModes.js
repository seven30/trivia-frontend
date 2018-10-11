import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { classicModeFetch, triviaFetch } from '../api/trivia-api.js'
import GameCard from '../components/GameCard';
import Timer from '../components/timer.js'
import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';
import AuthService from '../services';
import { createGameHistory } from '../api/game-history-api';
import Game from './Game';

//Object of all categories, and their corresponding number for the api requests
const CATEGORIES = {
  "0": "Random",
  "9": "General Knowledge",
  "10": "Books",
  "11": "Film",
  "12": "Music",
  "13": "Musicals & Theatres",
  "14": "Television",
  "15": "Video Games",
  "16": "Board Games",
  "17": "Science & Nature",
  "18": "Computers",
  "19": "Mathematics",
  "20": "Mythology",
  "21": "Sports",
  "22": "Geography",
  "23": "History",
  "24": "Politics",
  "25": "Art",
  "26": "Celebrities",
  "27": "Animals",
  "28": "Vehicles",
  "29": "Comics",
  "30": "Science: Gadgets",
  "31": "Japanese Anime & Manga",
  "32": "Cartoon & Animations",
}


const styles = theme => ({
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'inline-block',
    alignItems: 'center',
    justify: 'center'
  },
  button: {
    width: '30vw',
    minWidth: '140px',
    height: 'auto',
    minHeight: '70px',
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
      //category: [],
      categoryNames: [],
      categoryNums: [],
      categorySelected: false,
    }
  }

  //redirects to the game page, sending along the game info
  startGame(){
    let { categoryNames, categoryNums } = this.state;
    //console.log(category);
    this.props.history.push({
      pathname: '/game',
      state: {
        num: 10,
        categoryNames: categoryNames,
        categoryNums: categoryNums,
        difficulty: ""
      }
    })
  }
  //Sets the categories for playing
  setCategory(categoryNum, categoryName){
    let { categoryNums, categoryNames, categorySelected }: Array = this.state;

    if(categoryNames.includes(categoryName)){
      categoryNames.splice(categoryNames.indexOf(categoryName), 1);
      categoryNums.splice(categoryNums.indexOf(categoryNum), 1);
    } else {
      categoryNames.push(categoryName);
      categoryNums.push(categoryNum);
    }

    if(categoryNames.length === 0 || categoryNums.length === 0){
      categorySelected = false;
    } else {
      categorySelected = true;
    }
    console.log("NAMES", categoryNames, "NUMS", categoryNums);
    this.setState({categoryNames: categoryNames, categoryNums: categoryNums, categorySelected: categorySelected})
  }

  render(){
    console.log("STATE", this.state);
    const { classes } = this.props;
    let { categoryNames, categoryNums, categorySelected } = this.state;
    //create an array from the CATEGORIES object
      //map through the array and return the buttons
    let categories =  Object.entries(CATEGORIES).map((category, i) => {
      //set button type based on which have been selected
      let btn_type = categoryNames.includes(category[1]) ? "contained" : "outlined";
        //If random is not selected, but another category is, make random unclickable
        if(categoryNames.length > 0 && !categoryNames.includes("Random") && category[1] === "Random"){
          return <Button key={i.toString()} className={classes.button} variant={btn_type} color="secondary">{category[1]}</Button>
        }//If random is seleced, make all other buttons unclickable
        else if(categoryNames.length > 0 && categoryNames.includes("Random")){
          if(category[1] === "Random"){
            return <Button key={i.toString()} className={classes.button} variant={btn_type} color="primary" onClick={this.setCategory.bind(this, category[0], category[1])}>{category[1]}</Button>
          } else {
            return <Button key={i.toString()} className={classes.button} variant={btn_type} color="secondary">{category[1]}</Button>
          }
        } // if 3 categories have been selected, make all other buttons unclickable, but the selected can be unselected.
         else if(categoryNames.length > 2){
          if(btn_type === "contained"){
            return <Button key={i.toString()} className={classes.button} variant={btn_type} color="primary" onClick={this.setCategory.bind(this, category[0], category[1])}>{category[1]}</Button>
          } else {
            return <Button key={i.toString()} className={classes.button} variant={btn_type} color="secondary">{category[1]}</Button>
          }
        } else { //Otherwise have all buttons clickable
          return <Button key={i.toString()} className={classes.button} variant={btn_type} color="primary" onClick={this.setCategory.bind(this, category[0], category[1])}>{category[1]}</Button>
        }
      })
    if(this.state.categorySelected){
      return (
        <div className={classes.container}>
          <Button className={classes.button} color="secondary" variant="contained" onClick={this.startGame.bind(this)}>Start Game</Button>
          <div className={classes.container}>
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
