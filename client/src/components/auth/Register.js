import React, { Component } from "react";
import Navbar from "../Navbar";
import TextField from "../commons/TextField";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();
    console.log('akakakaka')
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { errors } = this.state;
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
                <form
                  noValidate
                  className="register_form"
                  onSubmit={this.onSubmit}
                >
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
                <h5 className="text-muted text-center already_line ">
                  Already have an account?{" "}
                  <span>
                    <Link to="/login">Login here</Link>
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
