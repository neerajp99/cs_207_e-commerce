import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import left_image from "../../img/nav-logo.svg"

class Dashboard extends Component {
  render() {
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
            <ul className="list-group text-center dashboard_list ">
            <img src = {left_image} className="dashboard_left_img"/>
              <li className="list-group-item list-group-item-action">
                User Info
              </li>
              <li className="list-group-item list-group-item-action">
                Wishlist
              </li>
              <li className="list-group-item list-group-item-action">
                Item Cart
              </li>
              <li className="list-group-item list-group-item-action">
                My Orders
              </li>
              <li className="list-group-item list-group-item-action">
                Account Settings
              </li>
              <li className="list-group-item list-group-item-action">Logout</li>
            </ul>
          </div>
          <div className="col-md-8 dashboard_right offset-sm-4">lorem</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
