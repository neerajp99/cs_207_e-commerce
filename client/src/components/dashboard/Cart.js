import React, { Component } from "react";
import cart_image from "../../img/mock.jpg";
import delete_icon from "../../img/delete.svg";
import { deleteCart, cartToWishlist } from "../../actions/cartActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Cart extends Component {
  state = {
    quantity: this.props.details.quantity,
    oldQuantity: 0,
    minQuantity: 1,
    maxQuantity: 5,
    initialPrice: this.props.details.product.price,
    price: this.props.details.product.price * this.props.details.quantity
  };
  onClickDelete = event => {
    event.preventDefault();
    this.props.deleteCart(this.props.details.productId);
  };
  onClickButton = event => {
    event.preventDefault();
    this.props.cartToWishlist(this.props.details.productId);
  };

  onChange = event => {
    console.log(this.state.price);
    const regEx = /^[0-9\b]+$/;

    if (event.target.value === "" || regEx.test(event.target.value)) {
      const blurValue = parseInt(this.state.quantity, 10);

      if (blurValue >= this.state.minQuantity) {
        this.setState({
          quantity: event.target.value,
          oldQuantity: this.state.quantity
        });
        // this.getPrice();
      }
    } else {
      this.setState({
        quantity: this.state.oldQuantity
      });
      // this.getPrice();
    }
    // this.forceUpdate();
  };

  incrementValue = () => {
    const newQuantity = parseInt(this.state.quantity, 10) + 1;
    if (newQuantity <= this.state.maxQuantity) {
      const newPrice = parseInt(
        (this.state.quantity + 1) * this.state.initialPrice
      );
      this.setState({
        price: newPrice,
        quantity: newQuantity,
        oldQuantity: this.state.quantity
      });
    }
  };

  decrementValue = () => {
    const newQuantity = parseInt(this.state.quantity, 10) - 1;
    const newPrice = parseInt(
      (this.state.quantity - 1) * this.state.initialPrice
    );
    if (newQuantity >= this.state.minQuantity) {
      this.setState({
        price: newPrice,
        quantity: newQuantity,
        oldQuantity: this.state.quantity
      });
    }
    this.forceUpdate();
  };

  getPrice = () => {
    const newPrice = parseInt(this.state.quantity * this.state.initialPrice);
    this.setState({
      price: newPrice
    });
  };
  render() {
    const { details } = this.props;
    return (
      <div className="card mb-3 cart_item_list" style={{ maxWidth: 740 }}>
        <div className="row no-gutters">
          <div className="col-md-4 img_back ">
            <img src={cart_image} className="card-img text-center" alt="..." />
            <button
              className="btn-dark btn btn-block mt-4 c2w_button"
              onClick={this.onClickButton}
            >
              Add to Wishlist
            </button>
          </div>
          <div className="col-md-8 cart_items_details">
            <div className="card-body">
              <h5 className="card-title cart_items_details_heading">
                {details.product.name}
              </h5>
              <small className="cart_price">${this.state.price}</small>

              <p className="card-text">{details.product.description}</p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
                <div className="cart_counter">
                  <button className="negative" onClick={this.decrementValue}>
                    &#8722;{" "}
                  </button>

                  <input
                    className="cart-li-qty-no cart_counter_input"
                    name="quantity"
                    value={this.state.quantity}
                    pattern="[0-9]+"
                    type="number"
                    min="1"
                    onChange={this.onChange}
                  />
                  <button className="positive" onClick={this.incrementValue}>
                    &#43;
                  </button>
                  <img
                    src={delete_icon}
                    alt="delete_icon"
                    className="cart_delete_icon"
                    onClick={this.onClickDelete}
                  />
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { deleteCart, cartToWishlist }
)(withRouter(Cart));
