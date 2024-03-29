import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import "./Register.css";
var Session = require('./../utils/Session');
var Utils = require('./../utils/Utils');

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        firstName: "",
        secondName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 
    && this.state.password.length > 0
    && this.state.firstName.length > 0
    && this.state.secondName.length > 0
    && this.state.password === this.state.confirmPassword;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    try {
        const register = {
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            emailAddress: this.state.email,
            password: this.state.password
        }

        axios.post(Utils.getServerConnectionStr('register', register))
        .then(response => {
            console.log(response)
            if (response.data.success == true)
            {
                Session.setSessionCookie({ 
                  token: response.data.token,
                  isAdmin: response.data.isAdmin,
                  isPending: response.data.isPending
              });
              this.props.userHasAuthenticated(true, response.data.isPending, response.data.isAdmin);
              this.props.history.push("/pending");
            }
            else
                alert(response.data.message)
        })
        .catch(e => console.log(e))

        //await Auth.signIn(this.state.email, this.state.password);
      } catch (e) {
        alert(e.message);
      }
  }

  render() {
    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="firstName" bsSize="large">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              autoFocus
              type="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="secondName" bsSize="large">
            <ControlLabel>Second Name</ControlLabel>
            <FormControl
              value={this.state.secondName}
              onChange={this.handleChange}
              type="secondName"
            />
          </FormGroup>
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
            <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">
            Register
          </Button>
        </form>
      </div>
    );
  }
}
