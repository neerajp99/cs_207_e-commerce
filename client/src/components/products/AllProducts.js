import React, { Component } from "react";
import Navbar from "../Navbar";
import shoe_image from "../../img/shoe5.jpeg";
import { getItems } from "../../actions/itemActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";

import { Link } from "react-router-dom";

class AllProducts extends Component {
  state = {
    query: ""
  };
  componentDidMount() {
    this.props.getItems();
  }

  onClickChange = event => {
    this.setState({
      query: event.target.type
    });
  };
  onClickAll = event => {
    this.setState({
      query: ""
    });
  };
  render() {
    const { query } = this.state;
    const { items } = this.props.items;

    let showingShoes;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingShoes = items.filter(shoe => match.test(shoe.category));
    } else {
      showingShoes = items;
    }

    // showingShoes.sort(sortBy("name"));

    console.log("Props", this.props.items);

    Object.keys(showingShoes).map((key, index) => {
      console.log(showingShoes[key]);
    });
    const itemss = Object.keys(showingShoes).map((key, index) => (
      <div className="card cardsss" style={{ width: "18rem" }}>
        {" "}
        <Link to={`/product/${showingShoes[key]._id}`}>
          <img
            src={shoe_image}
            className="card-img-top prouct_image"
            alt="..."
          />
        </Link>
        <div className=" product_body">
          <h3 className="text-left cardsss_h3">{showingShoes[key].name}</h3>
          <small>
            <strong>From ${showingShoes[key].price}</strong>
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
              <li
                className="list-group-item products_left_list_item "
                type="all"
                onClick={this.onClickAll}
              >
                All Products
              </li>
              <li
                className="list-group-item products_left_list_item"
                type="Casual"
                onClick={this.onClickChange}
              >
                Casual
              </li>
              <li
                className="list-group-item products_left_list_item"
                type="Formal"
                onClick={this.onClickChange}
              >
                Formal
              </li>
              <li
                className="list-group-item products_left_list_item"
                type="Running"
                onClick={this.onClickChange}
              >
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
