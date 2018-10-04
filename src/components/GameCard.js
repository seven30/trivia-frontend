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
    //Assign current question obj from array using the current count
    let questionObj = questions[this.props.counter];
    //assign and store question string from questionObj
    let question = questionObj.question;
    //Run helper functions replaceUnicode to replace unicode with appropriate characters
    question = replaceUnicode(question);
    let { correct_answer, incorrect_answers } = questionObj;
    //Set incorrect_answers array to a new variable
    let answers = incorrect_answers;
    //Push the correct answer string into the new answers array
    answers.push(correct_answer);
    //Run helper function shuffle to shuffle the array values
    shuffle(answers);
    //Map the answers in answer array to different Buttons
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
