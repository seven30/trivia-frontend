import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import AuthService from '../services'
import Logo from '../components/TriviaNightLogo.png';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import '../fonts/fonts.css';


const styles = {
  card: {
    minWidth: 275,
    marginTop: '10vh'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 35,
    fontFamily: "freescript"
  },
  pos: {
    marginBottom: 12,
  },
};

class NewRegister extends Component {
  constructor(props) {
  	super(props)
  	this.auth = new AuthService()
  	this.state = {
  		errors: "",
  			user: {
  				username: "",
  				email: "",
  				password: ""
  			}
  	}
  }


  render() {
    const { classes } = this.props;
    let { username, email, password } = this.state.user
    console.log(this.state.user)
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
          <Card className={classes.card}>
            <CardContent>
              <div className={classNames(classes.pos, classes.title)} color="textSecondary">
                Register Now:
              </div>
              <form onSubmit={this.onSubmit}>
              <div>
              <TextField
                id="filled-dense"
                label="Username"
                className={classes.textField}
                type="text"
                name="username"
                margin="normal"
                value={username}
                onChange={this.handleChange}
              />
              </div>
              <div>
              <TextField
                  id="email-input"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  value={email}
                  onChange={this.handleChange}
              />
                {this.state.errors.email && <div>Error: Email  {this.state.errors.email[0]}</div>}
              </div>
              <div>

              <TextField
                  id="oulined-password-input"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  margin="normal"
                  value={password}
                  onChange={this.handleChange}
              />
                {this.state.errors.password && <div>Error: Password  {this.state.errors.password[0]}</div>}
                </div>
              </form>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.onSubmit}>Register</Button>
            </CardActions>
          </Card>
     </Grid>
  )}

  // onChange = (e) => {
  //   let { form } = this.state
  //
  //   form.user[e.target.name] = e.target.value
  //
  //   this.setState({ form })
  //   console.log(e.target.name)
  //   console.log(e.target.value)
  // }

  // track each keystroke, save the value to state
  handleChange = (event) => {
      // copy form from state
      let { user } = this.state

      // copy event target name and value (target will be a form field)
      let fieldName = event.target.name
      let inputValue = event.target.value

      console.log(inputValue, fieldName);

      // update form object with new value from user
      user[fieldName] = inputValue

      this.setState({user})
  }

  onSubmit = (e) => {
    console.log("::SUBMIT::")
    e.preventDefault()
    let { username, email, password } = this.state.user
    //let user = {user: { email: email, password: password } };

    this.auth.register(this.state)
    //.then(this.auth.login(user))
    .then(json => {
      console.log("handling any errors", json);
      this.props.history.push('/')
      if(json.errors) {
        this.setState({
          errors: json.errors
        })
      }
      return json
    })
  }
}

export default withStyles(styles)(NewRegister);
