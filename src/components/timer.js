import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import '../pages/Game.css';

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      completed: 0,
      time: 20000,
      start: 20000,
      isOn: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      // start: Date.now() - this.state.time,
      start: Date.now(),
      isOn: true
    })

    this.timer = setInterval(() => {
      if (this.state.time<0) {
        this.setState({time: 0, isOn: false})
        clearInterval(this.timer)
        //Supplied a default string for checkAnswer in the case that the player runs out of time and does not actually choose an answer.
        this.props.checkAnswer("You did not answer.", this.props.answers_order)
      }


      else {
        this.setState({
        time: 20000 - (Date.now() - this.state.start)
        })
      }
    }, 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 20000})
  }

  componentDidMount(){
    this.startTimer()
  }

  componentDidUpdate(prevProps) {
    if (this.props.questionIsAnswered !== prevProps.questionIsAnswered) {
      this.stopTimer();
    }
    if (this.props.counter !== prevProps.counter) {
      this.resetTimer()
      this.startTimer()
    }
  }

  render(){
    return (
      <div>

      </div>
    )
  }
}
export default Timer;
