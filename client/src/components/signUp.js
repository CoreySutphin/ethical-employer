import React, { Component } from "react";
import { Button, Form, Col, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import axios from 'axios';
import '../style.css';

export default class SignUp extends Component {
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

    axios.post('/api/users', user)
      .then(res => {
        console.log(res);
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <div className="signup">

        <h1 align="center" className="login-header">Sign up for Ethical Employer</h1>

        <Form horizontal className="signup-form" onSubmit={this.handleSubmit}>

          <FormGroup controlId="email" bsSize="large">
            <Col smOffset={1} sm={10}>
              <Col componentClass={ControlLabel} sm={3}>
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
              <Col componentClass={ControlLabel} sm={4}>
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
              <Button block type="submit" disabled={!this.validateForm()} bsStyle="danger" className="submit-button">
                Create Account
              </Button>
            </Col>
          </FormGroup>

        </Form>;

      </div>
    );
  }
}
