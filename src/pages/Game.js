import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { classicModeFetch } from '../api/trivia-api.js'
import GameCard from '../components/GameCard';
import { replaceUnicode } from '../helper_functions/helper-functions.js';


class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      questions: [],
      counter: 0,
      questionsFetched: false,
      score: 0
    }
  }

  componentDidMount(){
    if(!this.state.questionsFetched){ // Check if data has already been fetched.
      //fetch trivia questions from opentb API : Random 10 questions, Random category, and difficulty
      fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then(res => {
        console.log(res);
        res = res.json()
        console.log(res);
        return res;
      }).then(res => {
        console.log(res.results[0]);
        this.setState({questionsFetched: true, questions: res.results});
      })
    }
  }

  checkAnswer(answer){
    console.log("CHECK ANS STATE", this.state);
    let { questions, counter } = this.state;
    // declare correct answer, and run helper function replaceUnicode to replace unicode with appropriate characters
    let correct = replaceUnicode(questions[counter].correct_answer);
    let score = this.state.score;
    console.log("in game component", answer);
    //Check passed in answer against the correct answer
    if(answer === correct){
      console.log("correct");
      //NOTE : Alter alert to display correct answer by highlighting the correct button.
      alert("Correct!" + " answer was: " + correct);
      score++;
    } else {
      console.log("incorrect");
      //NOTE : Alter alert to display correct answer by highlighting the correct button.
      alert("Incorrect!" + " correct answer is: " + correct);
    }
    counter++;
    this.setState({counter: counter, score: score});
  }

  render() {
    if(this.state.counter !== 0 && this.state.counter === this.state.questions.length){
      return (
        <div>
          <h1>Game Done!</h1>
          <h2>Score: {this.state.score/this.state.questions.length*100}%</h2>
          <Button>Play Again</Button>
        </div>
      )
    }
    console.log("STATE", this.state);
    return (
    <div>
      {this.state.questionsFetched &&
      <GameCard questions={this.state.questions} counter={this.state.counter} checkAnswer={this.checkAnswer.bind(this)}/>}
    </div>
    );
  }
}

export default Game;
