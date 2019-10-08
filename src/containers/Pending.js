import React, { Component } from "react";
import "./Pending.css";
var Session = require('./../utils/Session');

export default class Pending extends Component {
  render() {
    console.log(Session.getSessionCookie())
    return (
      <div className="Pending">
        <div className="lander">
          <h1>Awaiting approval...</h1>
          <p>An admin member has been notified and will approve you shortly</p>
        </div>
      </div>
    );
  }
}
