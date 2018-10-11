import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class TimerBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      completed: 0,
      isOn: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }


  startTimer() {
    this.timer = setInterval(this.progress, 20)
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20)
  }

  resetTimer() {
    this.setState({completed: 0})
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

  componentDidUpdate(prevProps) {
    if (this.props.questionIsAnswered !== prevProps.questionIsAnswered) {
      this.stopTimer();
      this.resetTimer();
    }
    if (this.props.counter !== prevProps.counter) {
      this.startTimer()
    }
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      // this.setState({ completed: 0 });
    } else {
      const diff = .103;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={this.state.completed} />

        <LinearProgress color="secondary" variant="determinate" value={this.state.completed} />
      </div>
    );
  }
}

export default withStyles(styles)(TimerBar);
