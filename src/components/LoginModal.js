import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../services';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: '${top}%',
    left: '${left}%',
    transform: 'translate(-${top}%,-${left}%)'
  }
}

  const styles = theme => ({
    paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
})

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


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" size= "large" onClick={this.handleOpen}> Open Modal </Button>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()}>
            egjkldf;skjhgfasjkd
          </div>
        </Modal>
      </div>
  )}
}



export default LoginModal;
