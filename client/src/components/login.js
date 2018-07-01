import React, { Component } from 'react';
import { Button, Form, Col, Row, Grid, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    var user = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('/api/auth', user)
      .then(res => {
        if (res.data.user) {
          sessionStorage.setItem("user", res.data.user);
          // If the user's previous location was passed along, send them back there.
          if (this.props.location.state) {
            this.props.history.push(this.props.location.state.prevPath);
          }
          else {
            this.props.history.push("/");
          }
        }
        else {
          this.setState({
            password: ""
          });
        }
      });
  }

  render() {
    return (
      <div className="login">

        <Grid>

          <Row>

            <h1 align="center" className="login-header">Log in to Ethical Employer</h1>

          </Row>

          <Row>

            <Form horizontal className="login-form" onSubmit={this.handleSubmit}>

              <FormGroup controlId="email" bsSize="large">
                <Col xsOffset={1} xs={10} mdOffset={1} md={10}>
                  <Col componentClass={ControlLabel} xs={3} md={3}>
                    Email
                  </Col>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    autoFocus
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="password" bsSize="large">
                <Col xsOffset={1} xs={10} mdOffset={1} md={10}>
                  <Col componentClass={ControlLabel} xs={4} md={4}>
                    Password
                  </Col>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col xsOffset={3} xs={6} mdOffset={3} md={6}>
                  <Button block type="submit" disabled={!this.validateForm()} bsStyle="danger">
                    Sign in
                  </Button>
                </Col>
              </FormGroup>

            </Form>

            <Col xsOffset={4} xs={4} mdOffset={4} md={4} className="login-footer">
              <Link to="/signup" textalign="center">Or create a new account</Link>
            </Col>

          </Row>

        </Grid>

      </div>
    );
  }
}
