import React, { Component } from "react";
import TextField from "./commons/TextField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaField from "./commons/TextAreaField";
import SelectList from "./commons/SelectList";
import back_image from "../img/back.jpg";
import { createProfile} from "../actions/profileActions"
import {getProfile} from "../actions/profileActions"

class AddProduct extends Component {
  state = {
    handle: this.props.profile.profile.handle,
    organisation: this.props.profile.profile.organisation,
    bio: this.props.profile.profile.bio,
    errors: {},
    contact: this.props.profile.profile.contact,
    address: this.props.profile.profile.address
  };

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }
  //
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  //
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  // Onchange method to update state
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const item = {
      handle: this.state.handle,
      organisation: this.state.organisation,
      bio: this.state.bio,
      contact: this.state.contact,
      address: this.state.address
    };
    this.props.createProfile(item, this.props.history)
    // this.props.postItem(item, this.props.history);
  };

  render() {
    return (
      <div className="container">
      <Link to="/dashboard" className="go_back">
        <img src={back_image} alt="back image" className="back_image back-image" />
      </Link>
        <div className="login container profile">
          <div className="row justify-content-center">
            <div class="col-8 center_text m-auto">
              <h1 className="login_heading display-5 text-center">
                {" "}
                Add Profile
              </h1>
              <div className="login_form text-center">
                <form
                  noValidate
                  className="login_form"
                  onSubmit={this.onSubmit}
                >
                  <TextField
                    placeholder="ex: micky"
                    name="handle"
                    type="text"
                    value={this.state.handle}
                    onChange={this.onChange}
                    label="User Handle"
                  />
                  <TextField
                    placeholder="ex: Google"
                    name="organisation"
                    type="text"
                    value={this.state.organisation}
                    onChange={this.onChange}
                    label="User Organisation"
                  />

                  <TextAreaField
                    placeholder="ex: Hi! I am a cool person."
                    name="bio"
                    type="text"
                    value={this.state.bio}
                    onChange={this.onChange}
                    label="Biography"
                    id="biography_textarea"
                  />
                  <TextField
                    placeholder="ex: +918766767336"
                    name="contact"
                    type="text"
                    value={this.state.contact}
                    onChange={this.onChange}
                    label="Contact Number"
                  />
                  <TextField
                    placeholder="Addresss"
                    name="address"
                    type="text"
                    value={this.state.address}
                    onChange={this.onChange}
                    label="User Address"
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

AddProduct.propTypes = {
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {createProfile, getProfile}
)(withRouter(AddProduct));
