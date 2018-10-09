import React, { Component } from 'react';
import { withStyles, Table } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { classicModeFetch, triviaFetch } from '../api/trivia-api.js'
import GameCard from '../components/GameCard';
import Timer from '../components/timer.js'
import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';
import AuthService from '../services';
import { createGameHistory } from '../api/game-history-api';

class Game extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService();
    this.gameMode = "Classic";
    this.state = {
      questions: [],
      counter: 0,
      questionsFetched: false,
      score: 0,
      answered_questions: [],
      answers_order: [],
      questionIsAnswered: false
    }
  }

  componentDidMount(){
    if(!this.state.questionsFetched){ // Check if data has already been fetched.
      //fetch trivia questions from opentb API : Random 10 questions, Random category, and difficulty
      //If props passed from game select
      if(this.props.location.state){
        let { num, category, difficulty } = this.props.location.state;
        console.log("PROPS from mode", this.props);
        let questions = triviaFetch(num, category, difficulty)
        .then(res => {
          console.log("first res", res);
          this.setState({questionsFetched: true, questions: res});
        })
      } else {// If nothing is selected
        let num, category, difficulty;
        let questions = triviaFetch(num, category, difficulty)
        .then(res => {
          console.log("first res", res);
          this.setState({questionsFetched: true, questions: res});
        })
      }
    }
  }

  checkAnswer(answer, answers_order){
    console.log("order", answers_order);
    let { questions, counter, score } = this.state;
    // declare correct answer, and run helper function replaceUnicode to replace unicode with appropriate characters
    let correct = replaceUnicode(questions[counter].correct_answer);
    // declare answered_questions object
    let answered_question: Object = {};
    //Check passed in answer against the correct answer
    if(answer === correct){
      //set answered_question correct true
      answered_question = { question_idx: counter, answered_correctly: true };
      score++;
    } else {
      //set answered_question correct false
      answered_question = { question_idx: counter, answered_correctly: false};
    }
    let { answered_questions } = this.state;
    answered_questions[counter] = answered_question;
    this.setState({score: score, answered_questions: answered_questions, answers_order: answers_order,
    questionIsAnswered: true});
  }

  nextQuestion(){
    let counter = this.state.counter;
    counter++;
    //increase counter to next question, and reset answers_order for next question
    this.setState({counter: counter, answers_order: [], questionIsAnswered: false })
  }

  saveGameHistory(){
    //create a game history object
    let game_history = {
      user_id: this.Auth.getUserId(),
      game_mode: this.gameMode,
      correct_answers: this.state.score,
      total_questions: this.state.questions.length
    }
    createGameHistory(game_history);
  }

  render() {
    let { score, questions, counter, questionsFetched, answered_questions, answers_order, questionIsAnswered } = this.state;
    let question, incorrect_answers, correct_answer, answers;
    //If counter has reached the end of the questions render end page.
    if(counter !== 0 && counter === questions.length){
      //If user is logged in, save game history.
      if(this.Auth.loggedIn()){
        this.saveGameHistory();
        return (
          <div>
            <h1 color="#FFFFFF">Game Done!</h1>
            <h2 color="#FFFFFF">Score: {score/questions.length*100}%</h2>
            <Button color="primary" href='/game'>Play Again</Button>
            <Button color="primary" href='/dashboard'>View Game History</Button>
          </div>
        )
      } else { //If guest, show end page with results, do not save history.
        return (
          <div>
            <h1>Game Done!</h1>
            <h2>Score: {score/questions.length*100}%</h2>
            <Button>Play Again</Button>
          </div>
        )
      }
    }
    console.log("STATE", this.state);
    //If game ongoing, render GameCard to display questions, and answers.
    return (
    <div>

      { questionsFetched && <Timer questions={questions} answers_order={answers_order} answered_questions={answered_questions} counter={counter} questionIsAnswered={questionIsAnswered} nextQuestion={this.nextQuestion.bind(this)} checkAnswer={this.checkAnswer.bind(this)}/>}

      { questionsFetched &&
      <GameCard questions={questions} answers_order={answers_order} answered_questions={answered_questions} counter={counter} nextQuestion={this.nextQuestion.bind(this)} checkAnswer={this.checkAnswer.bind(this)}/>}
    </div>
    );
  }
}

export default Game;

// if(!this.state.questionsFetched){ // Check if data has already been fetched.
//   //fetch trivia questions from opentb API : Random 10 questions, Random category, and difficulty
//   fetch("https://opentdb.com/api.php?amount=10&type=multiple")
//   .then(res => {
//     //console.log(res);
//     res = res.json()
//     //console.log(res);
//     return res;
//   }).then(res => {
//     console.log(res.results);
//     this.setState({questionsFetched: true, questions: res.results});
//   })
// }
