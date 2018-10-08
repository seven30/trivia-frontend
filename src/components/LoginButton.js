import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthService from '../services'
import { Link } from 'react-router-dom'

import LoginModal from './LoginModal.js'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#000000'},
    secondary: {main: '#AED6F1'},
    type: 'dark',
  }
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
