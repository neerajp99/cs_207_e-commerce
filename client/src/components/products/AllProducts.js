import React, { Component } from "react";
import Navbar from "../Navbar";
import shoe_image from "../../img/shoe5.jpeg";
import { getItems } from "../../actions/itemActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

class AllProducts extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    console.log("Props", this.props.items);
    const { items } = this.props.items;
    const itemss = Object.keys(items).map((key, index) => (
      <div className="card cardsss" style={{ width: "18rem" }}>
        <img src={shoe_image} className="card-img-top prouct_image" alt="..." />
        <div className=" product_body">
          <h3 className="text-left cardsss_h3">Macbook Pro</h3>
          <small>
            <strong>From $208.99</strong>
          </small>
        </div>
      </div>
    ));
    return (
      <div className="products">
        <Navbar />
        <div class="row products_row">
          <div className="col-md-3">
            <h3 className="text-left products_left_head">
              Shop/ <br />{" "}
              <span>
                All <br />
                Products
              </span>
            </h3>
            <ul className=" products_left_list">
              <li className="list-group-item products_left_list_item ">
                All Products
              </li>
              <li className="list-group-item products_left_list_item">
                Casual
              </li>
              <li className="list-group-item products_left_list_item">
                Formal
              </li>
              <li className="list-group-item products_left_list_item">
                Running
              </li>
            </ul>
          </div>
          <div className="col-md-9 all_p">{itemss}</div>
        </div>
      </div>
    );
  }
}

AllProducts.propTypes = {
  items: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items
});

export default connect(
  mapStateToProps,
  { getItems }
)(withRouter(AllProducts));
