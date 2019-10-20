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
              <h3 className="brand">JORDAN</h3>
              <hr></hr>
              <h2 className="product-name">AIR JORDAN XXXIV PF 'WHITE'</h2>
              <h3 className="product-price">$699</h3>
              <h6 className="description">Description</h6>
              <hr></hr>
              <h6 className="product-description">Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </h6>
              <ul className="prod-list">
              <li className="list-item"><button className="prod-button">Add to Cart</button></li>
              <li className="list-item"><button className="prod-button">Wishlist</button></li>
              <li className="list-item"><button className="prod-button">Quantity</button></li>
              </ul>
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
