import React, { Component } from "react";
import { Button, Form, Col, Row, Grid, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
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

        <Grid>

          <Row>

            <h1 align="center" className="login-header">Sign up for Ethical Employer</h1>

          </Row>

          <Row>

            <Form horizontal className="signup-form" onSubmit={this.handleSubmit}>

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
                  <Button block type="submit" disabled={!this.validateForm()} bsStyle="danger" className="submit-button">
                    Create Account
                  </Button>
                </Col>
              </FormGroup>

            </Form>

          </Row>

        </Grid>

      </div>
    );
  }
}
