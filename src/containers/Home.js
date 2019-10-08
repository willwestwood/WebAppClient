import React, { Component } from "react";
import "./Home.css";
var Session = require('./../utils/Session');

export default class Home extends Component {
  render() {
    console.log(Session.getSessionCookie())
    return (
      <div className="Home">
        <div className="lander">
          <h1>CRM</h1>
          <p>A customer relationship management tool</p>
        </div>
      </div>
    );
  }
}
