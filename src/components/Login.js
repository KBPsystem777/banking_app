import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { validateFields } from "../utils/common";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMsg: "",
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const fieldsToValidate = [{ email }, { password }];
    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signin_error: "Please answer all the fields",
        },
      });
    } else {
      this.setState({
        errorMsg: {
          signin_error: "",
        },
      });
      // for successful logins
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { errorMsg } = this.state;
    return (
      <div className="login-page">
        <h1>Banking Application</h1>
        <div className="login-form">
          <Form onSubmit={this.handleLogin}>
            {errorMsg && errorMsg.signin_error && (
              <p className="errorMsg centered-message">
                {errorMsg.signin_error}
              </p>
            )}
            <Form.Group controlID="email">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlID="email">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Link to="/register" className="btn btn-secondary">
                Create Account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
