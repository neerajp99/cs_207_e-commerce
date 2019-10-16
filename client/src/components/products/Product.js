import React, { Component } from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getItemById } from "../../actions/itemActions";

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
        Hello world
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
