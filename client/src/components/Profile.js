import React, { Component } from "react";
import TextField from "./commons/TextField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaField from "./commons/TextAreaField";
import SelectList from "./commons/SelectList";

class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    category: "",
    price: "",
    size: "",
    errors: {}
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

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const item = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      price: this.state.price,
      size: this.state.size
    };
    // this.props.postItem(item, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <div className="login container">
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
  // postItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { }
)(withRouter(AddProduct));
