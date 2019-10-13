import React, { Component } from "react";
import "./Admin.css";
var Session = require('../utils/Session');

export default class Admin extends Component {
  render() {
    console.log(Session.getSessionCookie())
    return (
      <div className="Admin">
        <div className="lander">
          <h1>CRM</h1>
          <p>Admin panel</p>
        </div>
      </div>
    );
  }
}
