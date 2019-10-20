import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import React, { Component, Fragment } from "react";
var Session = require('./utils/Session');
var Utils = require('./utils/Utils');

class App extends Component {
  constructor(props) {
    super(props);

    let isAuthenticated = false
    let isAdmin = false
    let isPending = false

    let session = Session.getSessionCookie()
    if (!Utils.isEmpty(session))
    {
      isAuthenticated = true
      if (session.isPending != undefined)
        isPending = session.isPending
      if (session.isAdmin != undefined)
        isAdmin = session.isAdmin
    }

    this.state = {
      isAuthenticated: isAuthenticated,
      isPending: isPending,
      isAdmin: isAdmin
    };
  }
  
  userHasAuthenticated = (isAuthenticated, isPending, isAdmin) => {
    this.setState({ 
      isAuthenticated: isAuthenticated,
      isPending: isPending,
      isAdmin: isAdmin
    })
  }

  handleLogout = event => {
    this.userHasAuthenticated(false, false, false)
    Session.resetSessionCookie()
  }
  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      isPending: this.state.isPending,
      isAdmin: this.state.isAdmin
    };
    
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">CRM</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.state.isAuthenticated
              ? <Fragment>
                  {this.state.isAdmin
                  ? <LinkContainer to="/admin">
                      <NavItem>Admin</NavItem>
                    </LinkContainer>
                  : null
                  }
                  <LinkContainer to="/home">
                    <NavItem>Home</NavItem>
                  </LinkContainer>
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
              : <Fragment>
                  <LinkContainer to="/register">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }  
  
}

export default App;
