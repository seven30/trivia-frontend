import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthService from '../services'

const auth = new AuthService()
let initialStatus = auth.loggedIn()

class Header extends Component {
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
                    <button onClick={this.logout}> Logout </button>
                    {(!this.state.loggedIn) && <Redirect to="/login" />}
                </div>
            )
        } else {
            return(
                <div>
                    <a href="/login"><button> Login </button></a>
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

export default Header
