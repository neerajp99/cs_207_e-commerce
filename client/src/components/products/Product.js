import React, { Component } from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getItemById } from "../../actions/itemActions";
import prod from "../../img/images.jpeg";
import { addToCart } from "../../actions/cartActions";
import { addToWishlist } from "../../actions/wishlistActions";

class Product extends Component {
  state = {
    selectedSize: "",
    six: "shoe_size_list_item",
    seven: "shoe_size_list_item",
    eight: "shoe_size_list_item",
    nine: "shoe_size_list_item",
    ten: "shoe_size_list_item"
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getItemById(this.props.match.params.id);
    }
  }
  onClickSize = event => {
    console.log(event.target.label);
    this.setState({
      selectedSize: [event.target.value],
      six: "shoe_size_list_item",
      seven: "shoe_size_list_item",
      eight: "shoe_size_list_item",
      nine: "shoe_size_list_item",
      ten: "shoe_size_list_item",
      [event.target.type]: "shoe_size_list_item checked_size"
    });
  };
  onClickCart = event => {
    event.preventDefault();
    if (this.props.items.item) {
      const cartFields = {
        name: this.props.items.item.name,
        description: this.props.items.item.description,
        category: this.props.items.item.category,
        size: this.state.selectedSize,
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
        size: this.state.selectedSize,
        price: this.props.items.item.price,
        productId: this.props.items.item._id
      };
      console.log(wishlistFields)
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
              <h3 className="brand">JORDAN</h3>
              <hr />
              <h2 className="product-name">{item.name}</h2>
              <h3 className="product-price">${item.price}</h3>
              <h6 className="description">Description</h6>
              <hr />
              <h6 className="product-description">{item.description}</h6>
              <br />
              <ul className="shoe_size_list">
                <li
                  className={this.state.six}
                  value="6"
                  type="six"
                  onClick={this.onClickSize}
                >
                  6
                </li>
                <li
                  className={this.state.seven}
                  value="7"
                  type="seven"
                  onClick={this.onClickSize}
                >
                  7
                </li>
                <li
                  className={this.state.eight}
                  value="8"
                  type="eight"
                  onClick={this.onClickSize}
                >
                  8
                </li>
                <li
                  className={this.state.nine}
                  value="9"
                  type="nine"
                  onClick={this.onClickSize}
                >
                  9
                </li>
                <li
                  className={this.state.ten}
                  value="10"
                  type="ten"
                  onClick={this.onClickSize}
                >
                  10
                </li>
              </ul>
              <ul className="prod-list">
                <li className="prod-list-item">
                  <button
                    className=" prod-button btn-dark btn btn-block mt-4"
                    onClick={this.onClickCart}
                  >
                    Add to Cart
                  </button>
                </li>
                <li className="prod-list-item">
                  <button
                    className=" prod-button btn-dark btn btn-block mt-4"
                    onClick={this.onClickWishlist}
                  >
                    Wishlist
                  </button>
                </li>
              </ul>
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
