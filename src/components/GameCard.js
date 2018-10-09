import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import '../pages/Game.css';
import './GameCard.css';

import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#008000",
    },
  },
});

class GameCard extends Component {
  handleAnswerClick(answer, answers_order){
    console.log(answer);
    let correct = this.props.questions[this.props.counter].correct_answer;
    console.log(correct);
    let incorrect = this.props.questions[this.props.counter].incorrect_answers;
    console.log("incorrect", incorrect);
    this.props.checkAnswer(answer, answers_order);
  }

  handleNextClick(){
    this.props.nextQuestion();
  }

  render(){
    console.log("PROPS", this.props);
    let { questions, counter, answered_questions, answers_order} = this.props;
    console.log("answered", answered_questions, answers);

    //Assign current question obj from array using the current count
    let questionObj = questions[counter];
    //assign and store question string from questionObj
    let question = questionObj.question;
    //Run helper functions replaceUnicode to replace unicode with appropriate characters
    question = replaceUnicode(question);
    let { correct_answer, incorrect_answers } = questionObj;
    // //Set incorrect_answers array to a new variable
    let answers = incorrect_answers;
    // Push the correct answer string into the new answers array
    if(!incorrect_answers.includes(correct_answer)){
      answers.push(correct_answer);
    }
    //If answers dont have an order
    if(answers_order.length === 0){
      // Run helper function shuffle to shuffle the array values
      shuffle(answers);
      answers_order = answers; //assign current order
    } else {
      answers = answers_order; //set answers to current order
      answers_order = []; //reset order
    }
    //Map the answers in answer array to different Buttons
    let answer = answers.map((val, i) => {
      val = replaceUnicode(val);
      correct_answer = replaceUnicode(correct_answer);
      if(answered_questions[counter]){
        let btn_color = val === correct_answer ? "primary" : "secondary"
        return (
          <Button color={btn_color} key={i.toString()}>{val}</Button>
        )
      }
      else {
        return (
          <Button key={i.toString()} onClick={this.handleAnswerClick.bind(this, answers[i], answers_order)}>{val}</Button>
        )
      }
    })
    return (
      <div className="gamepage">
        <Card className="card">
          <CardContent>
            <p>{question}</p>
            <MuiThemeProvider theme={theme}>
              {answer}
            </MuiThemeProvider>
          </CardContent>
            <CardActions>
              {answered_questions[counter] && <Button size="small" onClick={this.handleNextClick.bind(this)}>Next</Button>}
            </CardActions>
        </Card>
      </div>
    )
  }
}
export default GameCard;
