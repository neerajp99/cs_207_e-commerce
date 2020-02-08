import React, { Component } from "react";
import cart_image from "../../img/mock.jpg";
import delete_icon from "../../img/delete.svg";
import { moveToCart } from "../../actions/wishlistActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteWishlist } from "../../actions/wishlistActions";

class Wishlist extends Component {
  onClick = event => {
    event.preventDefault();
    console.log(this.props.details.productId)
    this.props.moveToCart(this.props.details.productId);
  };

  onClickDelete =event => {
    event.preventDefault()
    this.props.deleteWishlist(this.props.details.productId);
  }
  render() {
    const { details } = this.props;

    return (
      <div className="card cardss" style={{ width: "18rem" }}>
        <img src={cart_image} className="card-img-top" alt="..." />
        <div className="card-body min-card-body">
          <img src={delete_icon} alt="delete_icon" className="wishlist_delete_icon" onClick={this.onClickDelete}/>
          <h3 className="text-left cardss_h3">{details.product.name}</h3>
          <small>
            <strong>${details.product.price}</strong>
          </small>
          <p className="card-text cardss_p">{details.product.description}</p>
        </div>
        <button
          onClick={this.onClick}
          className="btn-dark btn btn-info btn-block mt-4 wishlist_button"
        >
          Add to cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wishlist: state.wishlist
});

export default connect(
  mapStateToProps,
  { moveToCart, deleteWishlist }
)(withRouter(Wishlist));
