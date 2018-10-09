import React, { Component } from 'react';
import Logo from '../components/TriviaNightLogo.png';
import LoginButton from '../components/LoginButton';

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({

//"palette" needed to change color of buttons
  palette: {
    primary: {main: '#000000'},
    secondary: {main: '#AED6F1'},
    type: 'dark',
  }
})

class Home extends Component {

  handleClick(){
    this.props.history.push('/game');
  }

  render() {
    console.log(this.props);
    return (
        <Grid container direction= "column"
          justify= "space-evenly"
          alignItems= "center">
              <img src= {Logo} alt = "Trivia Night" height= "450vw" width="auto"/>
              <MuiThemeProvider theme={theme}>
                  <Button variant="contained" color="primary" size= "large" component={Link} to="/game">
                  Play as Guest
                  </Button>
                  <Button variant="contained" color="primary" size= "large" component={Link} to="/modalexample">
                  modal example
                  </Button>
                  <LoginButton/>
              </MuiThemeProvider>
        </Grid>
    );
  }
}

export default Home;
