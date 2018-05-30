import React, { Component } from 'react';
import { Button, Form, Col, Checkbox, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { Link, withRouter, Redirect } from 'react-router-dom';
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
          this.props.history.push('/');
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

        <h1 align="center" className="login-header">Log in to Ethical Employer</h1>

        <Form horizontal className="login-form" onSubmit={this.handleSubmit}>

          <FormGroup controlId="email" bsSize="large">
            <Col smOffset={1} sm={10}>
              <Col componentClass={ControlLabel} smOffset={0} sm={3}>
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
            <Col smOffset={1} sm={10}>
              <Col componentClass={ControlLabel} smOffset={0} sm={4}>
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
            <Col smOffset={3} sm={6}>
              <Button block type="submit" disabled={!this.validateForm()} bsStyle="danger">
                Sign in
              </Button>
            </Col>
          </FormGroup>

        </Form>

        <Col smOffset={4} sm={4} className="login-footer">
          <Link to="/signup" textalign="center">Or create a new account</Link>
        </Col>

      </div>
    );
  }
}
