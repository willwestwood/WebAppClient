import React, { Component } from "react";
import "./Admin.css";

export default class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
