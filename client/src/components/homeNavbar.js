import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Login from './login';
import style from "../style.css"

export default class HomeNavbar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Navbar inverse collapseOnSelect className="home-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" className="navbar-brand">Ethical Employer</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <Button bsStyle="success" className="signup-button" href="/signup">Sign Up</Button>
          </Navbar.Form>
          <Navbar.Form pullRight>
            <Button bsStyle="primary" className="login-button" href="/login">Login</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
