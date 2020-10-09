import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { validate, validateFields } from "../utils/common";
import { Link } from "react-router-dom";

class Login extends React.Componen {
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
        signin_error: "Please answer all the fields",
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
    const { errorsg } = this.state;
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
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
