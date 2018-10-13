import React, { Component } from 'react';
import Logo from '../components/TriviaNightLogo.png';
import LoginButton from '../components/LoginButton';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AuthService from '../services';
import classNames from 'classnames';
import '../fonts/fonts.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  startButton: {
    marginBottom: theme.spacing.unit,
    minWidth: '25vw',
    color: 'lightblue',
    borderColor: "#f2aeae",
    fontSize: '2em',
    fontFamily: "freescript",
  }
});

const theme = createMuiTheme({

//"palette" needed to change color of buttons
  palette: {
    primary: {main: '#000000'},
    secondary: {main: '#AED6F1'},
    // type: 'dark', //<---- gives dark theme when active
  }
})

class Home extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService();
  }

  handleClick(){
    this.props.history.push('/game');
  }

  logout(){
    //this.props.history.push('/');
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
        <Grid container direction= "column"
          justify= "space-evenly"
          alignItems= "center">
              <img src= {Logo} alt = "Trivia Night" height= "450vw" width="auto"/>
              <MuiThemeProvider theme={theme}>
                  {!this.auth.loggedIn() && <Button className={classes.startButton} variant="contained" color="primary" size= "large" component={Link} to="/selectgame">Play as Guest</Button>}
                  {this.auth.loggedIn() && <Button className={classes.startButton} variant="contained" color="primary" size= "large" component={Link} to="/selectgame">Play a Game</Button>}
                  <LoginButton className={classes.startButton} history={this.props.history} logout={this.logout.bind(this)}/>
              </MuiThemeProvider>
        </Grid>
    );
  }
}

export default withStyles(styles)(Home);
