import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthService from '../services'
import { Link } from 'react-router-dom'

import LoginModal from './LoginModal.js';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//function handles the Modal size
function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
//withStyles for buttons
const theme = createMuiTheme({
  palette: {
    primary: {main: '#000000'},
    secondary: {main: '#AED6F1'},
    type: 'dark',
  }
})

//withStyles for modal
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  TextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
})

const auth = new AuthService()
let initialStatus = auth.loggedIn()

class LoginButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: initialStatus
        }
    }
    render() {
        if(this.state.status || auth.loggedIn()){
            return (
                <div>
                    <Button size= "large" variant="contained" color= "primary" onClick={this.logout}> Logout </Button>
                    {(!this.state.loggedIn) && <Redirect to="/login" />}
                </div>
            )
        } else {
            return(
                <div>
                    <Button size= "large" variant="contained" color="primary" component={Link} to="/login"> Login </Button>
                    {(this.state.loggedIn) && <Redirect to="/protected" />}
                </div>
            )
        }
    }

    logout = () => {
        auth.logout()
        this.setState({
            loggedIn: false
        })
    }
}

export default LoginButton
