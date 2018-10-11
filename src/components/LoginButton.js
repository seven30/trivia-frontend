import React, { Component } from 'react'
import AuthService from '../services'
import Login from '../pages/Login.js';
import { Modal, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

//withStyles for modal
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
})


const auth = new AuthService()
let initialStatus = auth.loggedIn()

class LoginButton extends Component {
    constructor(props) {
        super(props)
        this.auth = new AuthService();
        this.state = {
          loggedIn: initialStatus,
          open: false
        }
    }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose(){
    this.setState({open: false, loggedIn: true})
  }

    render() {
      console.log("LB", this.props);
      const { classes } = this.props;
      return (
        <div>
          {this.auth.loggedIn() && <Button size= "large" variant="contained" color= "primary" onClick={this.logout}> Logout </Button>}
          {!this.auth.loggedIn() && <Button size= "large" variant="contained" color="primary" onClick={this.handleOpen.bind(this)}> Login </Button>}
            <Modal
              open={this.state.open}
              onClose={this.handleClose.bind(this)}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Login history={this.props.history} closeModal={this.handleClose.bind(this)}/>
                </div>
            </Modal>
          </div>
        )
    }

    logout = () => {
        auth.logout()
        this.setState({
            loggedIn: false
        })
        this.props.history.push('/');
    }
}

export default withStyles(styles)(LoginButton)
