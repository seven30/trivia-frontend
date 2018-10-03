import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import '../pages/Game.css';
import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';

class GameCard extends Component {
  constructor(props){
    super(props)
  }

  // otherCheckAnswer(answer){
  //   console.log(answer);
  //   this.props.checkAnswer(answer);
  // }
  // this.otherCheckAnswer.bind(this, answers[i])

  render(){
    console.log("PROPS", this.props);
    let { questions } = this.props;
    let questionObj = questions[this.props.counter];
    let question = questionObj.question;
    question = replaceUnicode(question);
    let { correct_answer, incorrect_answers } = questionObj;
    //console.log("INC", incorrect_answers, "COR", correct_answer);
    let answers = incorrect_answers;
    answers.push(correct_answer);
    //console.log("ANS", answers);
    shuffle(answers);
    //console.log("SHUFFLE", answers);
    let answer = answers.map((val, i) => {
      val = replaceUnicode(val);
      return (
        <Button key={i.toString()} onClick={() => this.props.checkAnswer(answers[i])}>{val}</Button>
      )
    })
    return (
      <div className="gamepage">
        <Card className="card">
          <CardContent>
            <p>{question}</p>
              {answer}
          </CardContent>
            <CardActions>
              <Button size="small">Next</Button>
            </CardActions>
        </Card>
      </div>
    )
  }
}
export default GameCard;
