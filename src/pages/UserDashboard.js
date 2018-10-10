import React, {  Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AuthService from '../services';
import { getGameHistory } from '../api/game-history-api';
import withAuth from '../components/withAuth.js'

const NumericTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    color: theme.palette.common.white,
    textAlign: "center",
  },
}))(TableCell)

const StringTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    color: theme.palette.common.white,
  },
}))(TableCell)

class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.auth = new AuthService()
    this.state = {
      username: '',
      gameHistories: []
    }
  }

  componentDidMount(){
    let userId = this.auth.getUserId()
    let gameHistories = getGameHistory(userId)
    .then(gameHistories => {
      console.log("in did mount", gameHistories);
      this.setState({
        gameHistories: gameHistories.history,
        username: gameHistories.username
      })
    });
  }

  calculateAverage = () => {
    let totalCorrect = 0;
    let totalAnswered = 0;
    let { gameHistories } = this.state;

    for (var i = 0; i < gameHistories.length; i++) {
      totalCorrect = totalCorrect + gameHistories[i].correct_answers;
      totalAnswered = totalAnswered + gameHistories[i].total_questions;
    }

    let average = Math.floor((totalCorrect/totalAnswered)*100);

    //if there is no average, set average to 0
    if(!average) {
      average = 0;
    }

    return average;
  }

  render() {
    let { username, gameHistories } = this.state;
    let average = this.calculateAverage()


    let gameHistory = gameHistories.map((gameHistory, i) => {
      return(
        <TableRow key = {i.toString()}>
          <StringTableCell component="th" scope="row">
          {gameHistory.game_mode}
          </StringTableCell>
          <NumericTableCell numeric>{gameHistory.correct_answers}</NumericTableCell>
          <NumericTableCell numeric>{gameHistory.total_questions}</NumericTableCell>
          <NumericTableCell numeric>{
            Math.floor((gameHistory.correct_answers/gameHistory.total_questions)*100)
          }%</NumericTableCell>
        </TableRow>
      )
    })

    return (
      <div>

        <TableHead>
          <TableRow>
            <StringTableCell>
              <h1>Score History</h1>
            </StringTableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          <TableRow>
            <StringTableCell>Game Mode</StringTableCell>
            <StringTableCell># of Correct Answers</StringTableCell>
            <StringTableCell>Total # of Questions</StringTableCell>
            <StringTableCell>Quiz Score</StringTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {gameHistory}
        </TableBody>

        <TableHead>
          <TableRow>
            <StringTableCell>
              <h3>{username}&rsquo;s Lifetime Score: {average}%</h3>
            </StringTableCell>
          </TableRow>
        </TableHead>

      </div>
    )
  }
}
  export default withAuth(UserDashboard);
