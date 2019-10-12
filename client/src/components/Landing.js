import React, { Component } from "react";
import Navbar from "./Navbar";
import shoe3 from "../img/shoe3.jpeg";
import shoe1 from "../img/shoe1.jpeg";
import weird from "../img/weird_flex.png";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Navbar />
        <div className="container landing-container">
          <div className="row">
            <div className="col-md-6 landing-left">Left side</div>
            <div className="col-md-6 landing-right">Right SIde</div>
          </div>
        </div>
        <div className="landing-second">
          <div className="dots-upper" />

          <div className="col-lg-10 m-auto text-center landing-second-center">
            <img src={shoe3} alt="verticl" className="vertical_image" />
            <img src={shoe1} alt="verticl" className="horizontal_image" />
            <img src={weird} alt="verticl" className="weird_image" />
            <Link to="/all-products">
              <button className="all_products">All Products</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
