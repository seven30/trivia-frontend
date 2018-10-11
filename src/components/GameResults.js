import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import AuthService from '../services';
import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';
import '../pages/Game.css';
import './GameCard.css';

const styles = {
  top: {
    border: 1,
    color: 'black',
    padding: '0 50px',
    width: "100vw"
  },
  correct: {
    background: '#4CAF50',
    border: 1,
    color: 'white',
    padding: '0 30px',
  },
  incorrect: {
    background: '#EF5350',
    border: 0,
    color: 'white',
    padding: '0 30px',
  },
};

class GameResults extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService();
  }

  render(){
    const { classes } = this.props
    let { questions, counter, answered_questions, answers_order, score} = this.props;
    //Created a bunch of snarky comments to be displayed to player after the game ends, based on their score.
    let messages = ["Yo, are you cereal? You couldn't even get one right?", "Hey, it's OK. I forgot everything I learned in college too.", "A calculator could do better than you.", "Better practice Jeopardy with Alexa tonight...", "Better than Dwight's free throw percentage I guess...", "Don't quit your day job, pal.", "Great job, Average Joe!", "Wow. Just... like... Wow.", "Dang, the glass is like 10% empty...", "Congratulations! You know how to use Google."]
    let final_score = score/questions.length*100
    let message = ''
    switch (true) {
      case final_score === 0:
        message = messages[0]
        break;
      case final_score>0 && final_score<=20:
        message = messages[1]
        break;
      case final_score>20 && final_score<=30:
        message = messages[2]
        break;
      case final_score>30 && final_score<=40:
        message = messages[3]
        break;
      case final_score>40 && final_score<=50:
        message = messages[4]
        break;
      case final_score>50 && final_score<=60:
        message = messages[5]
        break;
      case final_score>60 && final_score<=70:
        message = messages[6]
        break;
      case final_score>70 && final_score<=89:
        message = messages[7]
        break;
      case final_score>89 && final_score<100:
        message = messages[8]
        break;
      default:
        message = messages[9]
    }

    {/*Create an array that contains Result objects for each question. Each result object will contain the question text, the correct answer for that question, and the player's actual answer.*/}
    let results = [];
    for (var i = 0; i < questions.length; i++) {
      results.push({question:'',correct:'',players:''})
    }
    {/*Updating each results object to receive the actual data contained in this.props*/}
    results.forEach((val,i)=>{
      val.question = questions[i].question
      val.correct = questions[i].correct_answer
      val.players = answered_questions[i].players_answer
    })

    {/*Used .map to clean up result objects as well as turn them into Cards to be rendered*/}
    let resultCards = results.map((val,i) => {
      val.question = replaceUnicode(val.question);
      val.correct = replaceUnicode(val.correct);
      val.players = replaceUnicode(val.players);
      if (val.correct === val.players) {
        return (
          <MuiThemeProvider>
            <Card classes={{root: classes.correct}}>
              <CardContent>
                  <h3>Question: {val.question}</h3>
                  <p>Correct Answer: {val.correct}
                  <br></br>
                  Your Answer: {val.players}</p>
              </CardContent>
            </Card>
          </MuiThemeProvider>
        )
      } else {
        return (
          <MuiThemeProvider>
            <Card classes={{root: classes.incorrect}}>
              <CardContent>
                  <h3>Question: {val.question}</h3>
                  <p>Correct Answer: {val.correct}
                  <br></br>
                  Your Answer: {val.players}</p>
              </CardContent>
            </Card>
          </MuiThemeProvider>
        )
      }
    })

    if(this.Auth.loggedIn()){
      return (
        <Card >
          <Grid container direction="column" justify="flex-start" alignItems="left" >
            <Card classes={{root: classes.top}}>
              <h1 color="primary">{message}</h1>
              <h2 color="primary">Score: {final_score}%</h2>
              <Button color="primary" href='/selectgame'>Play Again</Button>
              <Button color="primary" href='/dashboard'>View Game History</Button>
            </Card>
          </Grid>
          <Grid container direction="column" justify="flex-start" alignItems="left">
            {resultCards}
          </Grid>
        </Card>
      )
    } else { //If guest, show end page with results, do not save history.
      return (
        <Card >
          <Grid container justify="flex-start" alignItems="left" classes={{root: classes.top}}>
            <Card classes={{root: classes.top}}>
              <h1 color="primary">{message}</h1>
              <h2 color="primary">Score: {final_score}%</h2>
              <Button color="primary" href='/selectgame'>Play Again</Button>
              <Button color="primary" href='/register'>Register here to save your scores!</Button>
            </Card>
          </Grid>
          <Grid container direction="column" justify="flex-start" alignItems="left">
            {resultCards}
          </Grid>
        </Card>
      )
    }
  }
}
export default withStyles(styles)(GameResults);
