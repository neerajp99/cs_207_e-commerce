import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import left_image from "../../Icons/Logo.png";
import back_image from "../../img/back.jpg";
import cart_image from "../../img/mock.jpg";
import TextField from "../commons/TextField";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCartItems } from "../../actions/cartActions";
import { getWishlistItems } from "../../actions/wishlistActions";
import Cart from "./Cart";
import Wishlist from "./Wishlist";

class Dashboard extends Component {
  state = {
    active: true,
    user: true,
    cart: false,
    wishlist: false,
    account: false,
    orders: false,
    logout: false,
    email: "",
    number: "",
    password: "",
    password2: ""
  };

  componentDidMount() {
    this.props.getCartItems();
    this.props.getWishlistItems();
    if (this.state.logout === true) {
      this.props.logoutUser(this.props.history);
    }
  }

  onClick = event => {
    event.preventDefault();
    console.log("ooooo", [event.target.getAttribute("name")]);

    this.setState({
      active: false,
      user: false,
      cart: false,
      wishlist: false,
      account: false,
      orders: false,
      [event.target.getAttribute("name")]: true
    });
  };

  onLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  // OnChange function to update state
  onChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    console.log(this.props.wishlist);
    const { cartItem } = this.props.cart;
    const { wishlistItem } = this.props.wishlist;
    const cartItems = Object.keys(cartItem).map((key, index) => (
      <Cart key={key} details={cartItem[key]} />
    ));
    const wishlistItems = Object.keys(wishlistItem).map((key, index) => (
      <Wishlist key={key} details={wishlistItem[key]} />
    ));
    return (
      <div className="dashboard">
        <div className="alert_top text-center m-auto fixed-top">
          <h5 className="dashboard_alert display-5 text-center">
            {" "}
            Free shipping on orders above $100.
          </h5>
        </div>

        <div className="row dashboard_row">
          <div className="col-md-4 dashboard_left fixed-bottom">
            <Link to="/" className="go_back">
              <img src={back_image} alt="back image" className="back_image" />
            </Link>
            <ul className="list-group text-center dashboard_list ">
              <img
                src={left_image}
                alt="left_image"
                className="dashboard_left_img"
              />
              <li
                onClick={this.onClick}
                name="user"
                className="list-group-item list-group-item-action left_links"
              >
                User Info
              </li>
              <li
                onClick={this.onClick}
                name="wishlist"
                className="list-group-item list-group-item-action left_links"
              >
                Wishlist
              </li>
              <li
                onClick={this.onClick}
                name="cart"
                className="list-group-item list-group-item-action left_links"
              >
                Item Cart
              </li>
              <li
                onClick={this.onClick}
                name="order"
                className="list-group-item list-group-item-action left_links"
              >
                My Orders
              </li>
              <li
                onClick={this.onClick}
                name="account"
                className="list-group-item list-group-item-action left_links"
              >
                Account Settings
              </li>
              <li
                onClick={this.onLogout}
                name="logout"
                className="list-group-item list-group-item-action left_links"
              >
                Logout
              </li>
            </ul>
          </div>
          <div className="col-md-8 dashboard_right offset-sm-4">
            {this.state.user === true && (
              <div className="row m-auto">
                <div className="col-md-8 user_info">
                  <h2>
                    {" "}
                    <span>Hello,</span> {this.props.auth.user.name}
                  </h2>
                  <img
                    src={cart_image}
                    alt="cart_image"
                    className="user_info_avatar"
                  />
                  <br />

                  <div className="user_info_content">
                  <button className="user_info_content_button btn btn-primary btn-lg">Create Profile</button>

                  </div>
                </div>
              </div>
            )}

            {this.state.cart === true && (
              <div className=" user_cart">
                <h1 className="user_cart_heading">
                  YOUR <br /> CART ITEMS
                </h1>
                <br />
                <div className="row cart_items">{cartItems}</div>
                <div className="subtotal col-md-8 ">
                  <h3 className="subtotal_text text-left">
                    <span>Subtotal:</span> $20.98
                  </h3>

                  <div className="cart-li-message">
                    Get free shipping on all orders over $350.
                  </div>

                  <button className="btn-dark btn btn-info btn-block mt-4 checkout_button">
                    Checkout
                  </button>
                </div>
              </div>
            )}

            {this.state.wishlist && (
              <div className="wishlist">
                <h1 className="wishlist_heading">
                  YOUR <br /> WISHLIST
                </h1>

                {wishlistItems}
              </div>
            )}

            {this.state.account && (
              <div className="account_settings col-md-10">
                <h1 className="account_heading">
                  ACCOUNT <br /> SETTINGS
                </h1>
                <h3 className="account_settings_title">Account </h3>
                <div className="row acc_sett">
                  <div className="col-md-5 settings_field">
                    <small>Email</small>
                    <TextField
                      className="account_textfield"
                      placeholder="tanuj,sood@gmail.com"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-5 settings_field">
                    <small>Phone</small>
                    <TextField
                      className="account_textfield"
                      placeholder="Enter Contact Number"
                      name="number"
                      type="number"
                      value={this.state.number}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-5 settings_field">
                    <small>Password</small>
                    <TextField
                      className="account_textfield"
                      placeholder="*******"
                      name="email"
                      type="passsword"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-5 settings_field">
                    <small>New Password</small>
                    <TextField
                      disabled={true}
                      className="account_textfield"
                      placeholder="Enter new password"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                  </div>

                  <button class="btn-dark btn btn-info mt-4 col-md-10 changes_button">
                    Save Changes
                  </button>
                </div>
                <h3 className="address_settings_title">Addresses </h3>
                <div class="row col-md-12">
                  <div className="col-md-5 address_field">
                    <small>DEFAULT</small>
                    <h4 className="text-left cardss_h3 address_name">
                      Macbook Pro
                    </h4>

                    <p className="card-text cardss_p address_p">
                      B-304, <br />
                      Antariksh Apartments, <br />
                      Dwarka Sector-5, <br />
                      New Delhi-110075
                    </p>
                  </div>
                  <div className="col-md-5 address_field">
                    <span class="m-auto">&#43;</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart,
  wishlist: state.wishlist
});

export default connect(
  mapStateToProps,
  { logoutUser, getCartItems, getWishlistItems }
)(withRouter(Dashboard));
