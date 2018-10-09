import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../services';

//Text Inputs
import LoginTextInputs from './LoginTextInputs.js';

//from Material-UI
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

//withStyles used to create CSS in Javascript
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
});

//handles when the Modal is open or closed
class LoginModal extends Component {
  constructor(props) {
    super(props)
      this.state = {
        open: false,
      }
    }
  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  //changes state for different inputs
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" size= "large" onClick={this.handleOpen}> Open Modal </Button>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            >
              <div style={getModalStyle()}className={classes.paper}>
                <LoginTextInputs/>
              </div>
          </Modal>
      </div>
  )}
}



export default withStyles(styles)(LoginModal);
