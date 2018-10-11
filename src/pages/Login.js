import React, { Component } from 'react';
import AuthService from '../services';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

//Styling for Login
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class Login extends Component {
    constructor(props) {
        super(props)

        this.auth = new AuthService()
        this.state = {
            success: false,
            user: {
                email: "",
                password: ""
            }
        }
    }

    render() {
        const { classes } = this.props;
        let { email, password } = this.state.user
        return (
            <div>
              <h3>Click <a href="./Register" >HERE</a> to create an account </h3>
              <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                  <TextField
                    id="email-input"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="oulined-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={this.handleChange}
                  />
                <input
                  type="submit"
                  value="Login"
                />
              </form>
            </div>
        )
    }

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

    // when user submits form,
    handleSubmit = (e) => {
      e.preventDefault()
      // this function requires an email and password
      this.auth.login(this.state)
      .then(json => {
			  console.log("handling any errors", this.props);
        this.props.closeModal();
        this.props.history.push('/');
			  if(json.errors) {
				  this.setState({
					  errors: json.errors
				  })
			  }
			  return json
		})
  }
}

export default withStyles(styles)(Login);
