import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import '../pages/Game.css';
const ms = require('pretty-ms')
//format using a library called ‘pretty-ms’ which converts milliseconds to a neat formatted string. We simply run npm install pretty-ms --save and import it to our project with const ms = require(‘pretty-ms’). Now ms(this.state.time) will give you a pretty formatted string with the pattern ‘hh:mm:ss’.
class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      time: 30000,
      start: 30000,
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
        this.props.checkAnswer(this.props.answers, this.props.answers_order)
      }


      else {
        this.setState({
        time: 30000 - (Date.now() - this.state.start)
        })
      }
    }, 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 30000})
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
      console.log("::RESET::");
      console.log(this.state.time);
      this.startTimer()
    }
  }

  render(){
    return (
      <div>
        <Card className="card">
          <div>
            <h3 onClick>Time Left: {ms(this.state.time)}</h3>
          </div>
        </Card>
      </div>
    )
  }
}
export default Timer;
