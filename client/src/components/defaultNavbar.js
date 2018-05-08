import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

export default class DefaultNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false
    }
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect className="default-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" className="navbar-brand">Ethical Employer</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              Leave a review
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              My Account
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
