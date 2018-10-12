import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import GameCard from '../components/GameCard';
import Timer from '../components/timer.js';
import GameResults from '../components/GameResults';
import TimerBar from '../components/TimerBar.js'
import { replaceUnicode, shuffle } from '../helper_functions/helper-functions.js';
import AuthService from '../services';
import { createGameHistory } from '../api/game-history-api';
import { triviaFetch } from '../api/trivia-api.js'
import Header from '../components/Header';


class Game extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService();
    this.gameMode = "Classic";
    //Set the current category type, if multiple category is Mixed, otherwise, it's the category picked by user.
    if(this.props.location.state.categoryNums.length > 1){
      this.category = "Mixed Categories";
    } else {
      this.category = this.props.location.state.categoryNames[0];
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

  //Recursive function for making multiple fetches to the trivia api
    //Takes in number of questions, array of categories, difficulty 'str', number of categories, an empty questions array
  multiFetch(numOfQuestions, categories, difficulty, numOfCategories, questions){
    let num = numOfQuestions % numOfCategories !== 0 ? Math.floor(numOfQuestions/numOfCategories) + 1 : Math.floor(numOfQuestions/numOfCategories);
    let category = categories[numOfCategories-1];
    //Base case to end the recursive function calls.
    if(numOfCategories === 0){
      //shuffle the order of the questions
      shuffle(questions);
      console.log(questions);
      //set state of all fetched questions
      this.setState({questionsFetched: true, questions: questions});
      return questions;
    } // run a trivia api fetch
    triviaFetch(num, category, difficulty).then(res => {
      //push all results as single entries into the questions array
      for(let i = 0; i < res.length; i++){
        questions.push(res[i]);
      } // re-run the multifetch with new params
      return this.multiFetch(numOfQuestions - num, categories, difficulty, numOfCategories - 1, questions);
    });
  }

  componentDidMount(){
    //Fetch if no props have been passed
    if(!this.props.location.state){
      triviaFetch(10, "", "").then(res => {
        console.log(res);
        this.setState({questionsFetched: true, questions: res});
      });
    } //Fetch if multiple categories are selected
    else if(this.props.location.state.categoryNums.length > 1){
      let {categoryNums, categoryNames, num, difficulty } = this.props.location.state;
      //shuffle the array of categories
      shuffle(categoryNums);
      //run the recursive fetch function
      this.multiFetch(num, categoryNums, difficulty, categoryNums.length, []);
    } //Fetch if a single category is selected
    else {
      console.log(this.props.location.state);
      let { num, categoryNames, categoryNums, difficulty } = this.props.location.state;
      console.log("num",num,"categoryNames",categoryNames,"categoryNums",categoryNums,"difficulty",difficulty);
      triviaFetch(num, categoryNums[0], difficulty).then(res => {
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
      answered_question = { question_idx: counter, answered_correctly: true, players_answer: answer };
      score++;
    } else {
      //set answered_question correct false
      answered_question = { question_idx: counter, answered_correctly: false, players_answer: answer};
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
    //If counter has reached the end of the questions render end page.
    if(counter !== 0 && counter === questions.length){
      //If user is logged in, save game history.
      if (this.Auth.loggedIn()) {
        this.saveGameHistory();
      }
      return (
        <div>
          <Header history={this.props.history}/>
          <GameResults questions={questions} answers_order={answers_order} answered_questions={answered_questions} counter={counter} questionIsAnswered={questionIsAnswered} score={score} nextQuestion={this.nextQuestion.bind(this)} checkAnswer={this.checkAnswer.bind(this)} />)
        </div>
      )
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
