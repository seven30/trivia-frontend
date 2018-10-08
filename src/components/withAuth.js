import React, { Component } from 'react'
import AuthService from '../services'

export default function withAuth(WrappedComponent) {
  //Create a new instance AuthService
  const Auth = new AuthService()

  //declare a new class of AuthWrapped
  return class AuthWrapped extends Component {
    //When this component renders, create the state "userId: null"
    constructor(props) {
      super(props)
      this.state = {
        userId: null
      }
    }


    componentDidMount() {
      if(!Auth.loggedIn()) {
        this.props.history.replace('/login')
      }
      else {
        try {
          const userId = Auth.getUserId()
          this.setState({ userId: userId })
        }
      }
      catch(err) {
        Auth.logout()
        this.props.history.replace('/login')
      }
    }

    render() {
      if(this.state.userId) {
        return(
          <WrappedComponent history={this.props.history} userId={this.state.userId} />
        )
      }
      else {
        return null
      }
    }
  }
}
