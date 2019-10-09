import React, { Component } from "react";
import Navbar from "../Navbar";
import TextField from "../commons/TextField";
import { Link } from "react-router-dom";


class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
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
        <div className="register container">
          <div className="row justify-content-center">
            <div class="col-8 center_text m-auto">
              <h1 className="register_heading display-5 text-center">
                {" "}
                Create Account
              </h1>
              <div className="register_form text-center">
                <form noValidate className="register_form">
                  <TextField
                    placeholder="ex: Tanuj Sood"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    label="Full Name"
                  />
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
                  <TextField
                    placeholder="ex: password12345"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    label="Confirm Password"
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4 register_button"

                  />
                </form>
                <h5 className="text-muted text-center already_line ">Already have an account? <span><Link to="/login">Login here</Link></span></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
