import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import "./Login.css";
var Session = require('./../utils/Session');
var Utils = require('./../utils/Utils');

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    try {
      const login = {
        user: this.state.email,
        password: this.state.password
      }

      axios.post(Utils.getServerConnectionStr('authenticate'), login)
      .then(response => {
          console.log(response)
          if (response.data.success === true)
          {
              Session.setSessionCookie({ 
                  token: response.data.token,
                  isAdmin: response.data.isAdmin,
                  isPending: response.data.isPending
              });
              this.props.userHasAuthenticated(true, response.data.isPending, response.data.isAdmin);

              if (response.data.isPending == false)
                  this.props.history.push("/home");
              else
                this.props.history.push("/pending");
          }
          else
              alert(response.data.message)
      })
      .catch(e => {
        console.log(e.message)
        this.props.history.push("/error");
      })

      //await Auth.signIn(this.state.email, this.state.password);
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            className="Button"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
