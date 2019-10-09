import React, { Component } from "react";
import Navbar from "../Navbar";
import TextField from "../commons/TextField";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    hidden: true,
    errors: {}
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="login container">
          <div className="row justify-content-center">
            <div class="col-8 center_text m-auto">
              <h1 className="login_heading display-5 text-center"> Login</h1>
              <div className="login_form text-center">
                <form noValidate className="login_form">
                  <TextField
                    placeholder="ex: tanuj.sood@gmail.com"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    label="Email Address"
                  />
                  <TextField
                    placeholder="ex: password12345"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    label="Password"
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4 login_button"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
