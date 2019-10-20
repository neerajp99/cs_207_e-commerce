import React, { Component } from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getItemById } from "../../actions/itemActions";
import prod from "../../img/images.jpeg";
import { addToCart } from "../../actions/cartActions";
import { addToWishlist } from "../../actions/wishlistActions";

class Product extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getItemById(this.props.match.params.id);
    }
  }
  onClickCart = event => {
    event.preventDefault();
    if (this.props.items.item) {
      const cartFields = {
        name: this.props.items.item.name,
        description: this.props.items.item.description,
        category: this.props.items.item.category,
        size: this.props.items.item.size,
        price: this.props.items.item.price,
        productId: this.props.items.item._id,
        quantity: 1
      };
      this.props.addToCart(cartFields, this.props.history);
    }
  };
  onClickWishlist = event => {
    event.preventDefault();
    if (this.props.items.item) {
      const wishlistFields = {
        name: this.props.items.item.name,
        description: this.props.items.item.description,
        category: this.props.items.item.category,
        size: this.props.items.item.size,
        price: this.props.items.item.price,
        productId: this.props.items.item._id
      };
      this.props.addToWishlist(wishlistFields, this.props.history);
    }
  };
  render() {
    const { item } = this.props.items;
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
  items: state.items
});

export default connect(
  mapStateToProps,
  { getItemById, addToCart, addToWishlist }
)(withRouter(Product));
