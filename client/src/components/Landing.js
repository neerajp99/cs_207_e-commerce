import React, { Component } from "react";
import Navbar from "./Navbar";
import shoe3 from "../img/shoe3.jpeg";
import shoe1 from "../img/shoe1.jpeg";
import weird from "../img/weird_flex.png";
import nike from "../img/nike.png";
import { Link } from "react-router-dom";
import mag from "../img/LandingShoe.png";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Navbar />
        <div className="container landing-container">
          <div className="row">
            <div className="col-md-6 landing-left">
              <div className="row">
                <img src={nike} alt="verticl" className="nike_logo" />
              </div>
              <div className="row">
                <h1 className="font">AIR MAGS</h1>
              </div>
              <div className="row">
                <h4 className="font1">SPECIAL RELEASE</h4>
              </div>
              <div className="row">
                <Link to="/all-products">
                  <button className="shop_now">Shop Now</button>
                </Link>
              </div>
            </div>
            <div className="col-md-6 landing-right">
              <img src={mag} alt="verticl" className="nikeshoe" />
            </div>
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
