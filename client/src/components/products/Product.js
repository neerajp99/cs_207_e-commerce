import React, { Component } from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getItemById } from "../../actions/itemActions";
import prod from "../../img/product_shoe.jpeg";

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
        <div className="col-md-4" product-left>
          <img src={prod} alt="verticl" className="product_image" />
        </div>
          <div className="col-md-8" product-right>
            <div className="row">
              <h3>JORDAN</h3>
            </div>
          </div>
          <div className="row">
            <h2>AIR JORDAN XXXIV PF 'WHITE'</h2>
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
