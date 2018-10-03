import React, { Component } from 'react';
import './Game.css';
import Question from '../components/question.js'
import Answers from '../components/answers.js'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { classicModeFetch } from '../api/trivia-api.js'


class Game extends Component {
  constructor(props){
    super(props)
    let data = classicModeFetch()
    console.log("DATA", data);
    this.state = {
      questions: [],
      counter: 0
    }
  }

  componentDidMount(){
    // fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    // .then(res => {
    //   console.log(res);
    //   res = res.json()
    //   console.log(res);
    //   return res;
    // }).then(res => {
    //   console.log(res.results[0]);
    //   this.setState({questionsFetched: true, questions: res.results});
    // })
  }

  render() {
    console.log("STATE", this.state);
    return (
      <div className="gamepage">
        <Card className="card">
          <CardContent>
            <Question questions = {this.state.questions}/>
            <p>{this.state.questionsFetched && this.state.questions[0].question}</p>
              <Button>
              {this.state.questions[0] && this.state.questions[0].incorrect_answers[0]}
              </Button>
              <Button>
              {this.state.questions[0] && this.state.questions[0].incorrect_answers[1]}
              </Button>
              <Button>
              {this.state.questions[0] && this.state.questions[0].incorrect_answers[2]}
              </Button>
              <Button>
              {this.state.questions[0] && this.state.questions[0].correct_answer}
              </Button>
          </CardContent>
            <CardActions>
              <Button size="small">Submit</Button>
            </CardActions>
        </Card>
      </div>
    );
  }
}

export default Game;
