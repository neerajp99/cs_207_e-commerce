import React, { Component } from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getItemById } from "../../actions/itemActions";
import prod from "../../img/images.jpeg";

class Product extends Component {
  componentDidMount() {
    console.log("lalalalalal", this.props.item);
    if (this.props.match.params.id) {
      this.props.getItemById(this.props.match.params.id);
    }
  }
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <div className="product">
        <Navbar />
        <div className="container product-container">
        <div className="row">
          <div className="col-md-6 product-left">
            <img src={prod} alt="verticl" className="product_image" />
          </div>
          <div className="col-md-6 product-right">
              <h1 className="product-price">$699</h1>
              <h3>JORDAN</h3>
              <h2>AIR JORDAN XXXIV PF 'WHITE'</h2>
          </div>
        </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItemById }
)(withRouter(Product));
