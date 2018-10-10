import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Table } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { classicModeFetch, triviaFetch } from '../api/trivia-api.js'
import GameCard from '../components/GameCard';
import Timer from '../components/timer.js'

////just for experimentation
import TimerBar from '../components/TimerBar.js'
////////////////////////////
import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';
import AuthService from '../services';
import { createGameHistory } from '../api/game-history-api';
import Header from '../components/Header';


class Game extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService();
    this.gameMode = "Classic";
    if(this.props.location.state){
      this.category = Object.values(this.props.location.state.category)[0];
    } else {
      this.category = "Random";
    }
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
    if(!this.props.location.state){
      triviaFetch(10, "", "").then(res => {
        console.log(res);
        this.setState({questionsFetched: true, questions: res});
      });
    } else {
      let { num, category, difficulty } = this.props.location.state;
      let categoryNum = Object.keys(category);
      let categoryName = Object.values(category);
      console.log("num",num,"category",category,"difficulty",difficulty,"catNum", categoryNum, "catName", categoryName);
      triviaFetch(num, categoryNum, difficulty).then(res => {
        console.log(res);
        this.setState({questionsFetched: true, questions: res});
      });
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
    console.log(this.category);
    let game_history = {
      user_id: this.Auth.getUserId(),
      game_mode: this.category,
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
            <Header history={this.props.history}/>
            <h1 color="#FFFFFF">Game Done!</h1>
            <h2 color="#FFFFFF">Score: {score/questions.length*100}%</h2>
            <Button color="primary" href='/selectgame'>Play Again</Button>
            <Button color="primary" href='/dashboard'>View Game History</Button>
          </div>
        )
      } else { //If guest, show end page with results, do not save history.
        return (
          <div>
            <Header history={this.props.history}/>
            <h1>Game Done!</h1>
            <h2>Score: {score/questions.length*100}%</h2>
            <Button color="primary"href='/selectgame'>Play Again</Button>
          </div>
        )
      }
    }
    console.log("STATE", this.state);
    //If game ongoing, render GameCard to display questions, and answers.
    return (
    <div>
      <Header history={this.props.history}/>
      {questionsFetched && <TimerBar questions={questions} answers_order={answers_order} answered_questions={answered_questions} counter={counter} questionIsAnswered={questionIsAnswered} nextQuestion={this.nextQuestion.bind(this)} checkAnswer={this.checkAnswer.bind(this)} />}

      { questionsFetched && <Timer questions={questions} answers_order={answers_order} answered_questions={answered_questions} counter={counter} questionIsAnswered={questionIsAnswered} nextQuestion={this.nextQuestion.bind(this)} checkAnswer={this.checkAnswer.bind(this)}/>}

      { questionsFetched &&
      <GameCard questions={questions} answers_order={answers_order} answered_questions={answered_questions} counter={counter} nextQuestion={this.nextQuestion.bind(this)} checkAnswer={this.checkAnswer.bind(this)}/>}
    </div>
    );
  }
}

export default Game;
