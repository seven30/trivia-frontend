import React, { Component } from 'react';
import './Game.css';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      questions: []
    }
  }

  componentWillMount(){
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res => {
      console.log(res);
      res = res.json()
      console.log(res);
      return res;
    }).then(res => {
      console.log(res.results[0]);
      this.setState({questions: res.results});
    })
  }

  render() {
    console.log("STATE", this.state);
    return (
      <div className="gamepage">
        <Card className="card">
          <CardContent>
            <p>{this.state.questions[0] && this.state.questions[0].question}</p>
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
