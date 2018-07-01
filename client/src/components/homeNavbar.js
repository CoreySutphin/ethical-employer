import React, { Component } from 'react';
import { Navbar, Button, Nav, NavItem } from 'react-bootstrap';
import "../style.css"

export default class HomeNavbar extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
  }

  handleLogoutButtonClick() {
    sessionStorage.removeItem("user");
  }

  render() {

    const buttons = sessionStorage.getItem("user") ? (
      <div>
        <Navbar.Form pullRight>
            <Button bsStyle="primary" className="login-button"
              onClick={this.handleLogoutButtonClick} href="/">Logout</Button>
        </Navbar.Form>
        <Nav pullRight>
          <NavItem eventKey={1} className="nav-item" href="/review">
            <span className="nav-item-text">Leave a review</span>
          </NavItem>
        </Nav>
      </div>
    ) : (
      <div>
        <Navbar.Form pullRight>
          <Button bsStyle="success" className="signup-button" href="/signup">Sign Up</Button>
        </Navbar.Form>
        <Navbar.Form pullRight>
          <Button bsStyle="primary" className="login-button" href="/login">Login</Button>
        </Navbar.Form>
      </div>
    );

    return (
      <Navbar inverse collapseOnSelect className="home-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" className="navbar-brand">Ethical Employer</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { buttons }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
