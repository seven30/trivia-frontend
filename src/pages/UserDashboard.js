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

class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.auth = new AuthService()
    this.state = {
      gameHistories: []
    }
  }

  componentDidMount(){
    let userId = this.auth.getUserId()
    let gameHistories = getGameHistory(userId)
    .then(gameHistories => {
      console.log("in did mount", gameHistories);
      this.setState({gameHistories: gameHistories})
    });
  }

  render() {
    console.log("state", this.state.gameHistories);
    let gameHistory = this.state.gameHistories.map((gameHistory, i) => {
      return(
        <TableRow key = {i.toString()}>
          <TableCell component="th" scope="row">
          {gameHistory.game_mode}
          </TableCell>
          <TableCell numeric>{gameHistory.correct_answers}</TableCell>
          <TableCell numeric>{gameHistory.total_questions}</TableCell>
          <TableCell numeric>{
            Math.floor((gameHistory.correct_answers/gameHistory.total_questions)*100)
          }%</TableCell>
        </TableRow>
      )
    })
    return (
      <div>
        <TableHead ><TableRow><TableCell><h1>Score History</h1></TableCell></TableRow></TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Game Mode</TableCell>
            <TableCell># of Correct Answers</TableCell>
            <TableCell>Total # of Questions</TableCell>
            <TableCell>Quiz Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{gameHistory}</TableBody>
      </div>
    )
  }
}
  export default withAuth(UserDashboard);
