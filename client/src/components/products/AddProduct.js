import React, { Component } from "react";
import Navbar from "../Navbar";
import TextField from "../commons/TextField";
import { Link } from "react-router-dom";
import { postItem } from "../../actions/itemActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaField from "../commons/TextAreaField";

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
    this.props.postItem(item, this.props.history);
  };
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="login container">
          <div className="row justify-content-center">
            <div class="col-8 center_text m-auto">
              <h1 className="login_heading display-5 text-center">
                {" "}
                Add Products
              </h1>
              <div className="login_form text-center">
                <form
                  noValidate
                  className="login_form"
                  onSubmit={this.onSubmit}
                >
                  <TextField
                    placeholder="ex: Nike Air"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                    label="Product Name"
                  />
                  <TextAreaField
                    placeholder="ex: Nike Air is a comfortable shoe etc etc flex"
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.onChange}
                    label="Product Description"
                  />
                  <TextField
                    placeholder="ex: Casual, Formal etc"
                    name="category"
                    type="text"
                    value={this.state.category}
                    onChange={this.onChange}
                    label="Product Category"
                  />
                  <TextField
                    placeholder="ex: 1999, do not add any currency symbol"
                    name="price"
                    type="text"
                    value={this.state.price}
                    onChange={this.onChange}
                    label="Product Price"
                  />
                  <TextField
                    placeholder="ex: 6, 6.5, 7"
                    name="size"
                    type="text"
                    value={this.state.size}
                    onChange={this.onChange}
                    label="Product Name"
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
  postItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postItem }
)(withRouter(AddProduct));
