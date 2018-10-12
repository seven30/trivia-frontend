import React, {  Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import AuthService from '../services';
import { getGameHistory } from '../api/game-history-api';
import withAuth from '../components/withAuth.js'
import Header from '../components/Header'

//TableCell created specifically for numbers
const NumericTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    color: theme.palette.common.white,
    textAlign: "center",
  },
}))(TableCell)

//TableCell created specifically for strings
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

    //fetch the username and game_histories from the database
    //gameHistories is an object containing {username: "username", history: {game_histories}}
    let gameHistories = getGameHistory(userId)
    .then(gameHistories => {
      //set the state of the UserDashboard component to information fetched from database
      this.setState({
        gameHistories: gameHistories.history,
        username: gameHistories.username
      })
    });
  }

  //this function calculates the lifetime average of a players game histories
  calculateAverage = () => {
    let totalCorrect = 0;
    let totalAnswered = 0;
    let { gameHistories } = this.state;

    //loop through the gameHistories array
    for (var i = 0; i < gameHistories.length; i++) {
      //set the variable totalCorrect to the sum of totalAnswered and # of correct_answers per each game_history
      totalCorrect = totalCorrect + gameHistories[i].correct_answers;
      //set the variable totalAnswered to the sum of totalAnswered and # of total_questions per each game_history
      totalAnswered = totalAnswered + gameHistories[i].total_questions;
    }
    //calculate the average by dividing totalCorrect by totalAnswered, multiply by 100 and round it to the nearest whole number
    let average = Math.floor((totalCorrect/totalAnswered)*100);

    //if there is no average, set average to 0
    if(!average) {
      average = 0;
    }

    return average;
  }

  render() {
    console.log("ENV API", process.env.API_URL);
    let { username, gameHistories } = this.state;
    let average = this.calculateAverage()

    //map through the gameHistories state to display information in TableRows
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
      <Header history={this.props.history}/>
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
