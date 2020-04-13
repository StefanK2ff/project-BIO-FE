//main imports
import React, { Component } from "react";
import { Link } from "react-router-dom";

//material UI Imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class Login extends Component {
  //local state for field input
  state = { email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <Typography component="h1" variant="h5">
          Welcome back! Please log in here.
        </Typography>
        <form noValidate onSubmit={this.handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="text"
            value={email}
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={this.handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value="Signup"
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <p>Don't have an account?</p>
              <Link to={"/signup"}> Sign up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Login;
