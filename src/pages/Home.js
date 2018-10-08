import React, { Component } from 'react';
import Logo from '../components/TriviaNightLogo.png';
import LoginButton from '../components/LoginButton';

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({

  palette: {
    primary: {main: '#000000'},
    secondary: {main: '#AED6F1'},
    type: 'dark',
  }
})

      // <div style={{ padding: "10vh" }}>
class Home extends Component {
  render() {
    return (
        <Grid container direction= "column"
          justify= "space-evenly"
          alignItems= "center">
            <Grid item>
              <img src= {Logo} alt = "Trivia Night" height= "450vw" width="auto"/>
            </Grid>
            <Grid item>
              <MuiThemeProvider theme={theme}>
                  <Button variant="contained" color="primary" size= "large" component={Link} to="/gameguest">
                  Play as Guest
                  </Button>
                  <LoginButton/>
              </MuiThemeProvider>
            </Grid>
        </Grid>
    );
  }
}

export default Home;
