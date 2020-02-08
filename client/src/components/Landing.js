import React, { Component } from "react";
import Navbar from "./Navbar";
import shoe3 from "../img/shoe3.jpeg";
import shoe1 from "../img/shoe1.jpeg";
import weird from "../img/weird_flex.png";
import nike from "../img/nike.png";
import { Link } from "react-router-dom";
import mag from "../img/LandingShoe.png";
import rack from "../img/Landing_Row.jpg";
import img1 from "../img/Landing_Close.jpg";

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
                <h4 className="font1">SPECIAL RELEASE </h4>
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
        <div className="container landing-second">
            <div className="col-md-5 landing-second-left">
              <img src={rack} alt="verticl" className="landing_img" />
            </div>
            <div className="col-md-7 landing-second-part">
              <h2 className="landing-heading">Up Your Sneaker Game.</h2>
              <p className="landing-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <h3 className="shop-tag">Shop Now →</h3>
            </div>
        </div>
        <div className="container landing-second">
            <div className="col-md-6 landing-second-part">
              <h2 className="landing-heading2">Style. Reimagined.</h2>
              <p className="landing-desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="col-md-6 landing-second-left">
              <img src={img1} alt="verticl" className="landing_img2" />
            </div>
        </div>
        <div className="col-lg-12 convincer">
          <Link to="/all-products"><h3 className="convince">Convinced? Browse Now →</h3></Link>
        </div>
      </div>
    );
  }
}
export default Landing;
