import React, { Component } from "react";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { withRouter } from "react-router";
import blog1 from "../../assets/images/blog1.jpg";
import "./About.scss";
import { NavLink, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section">
          <Link to="/" style={{ color: "black" }}>
            <div>
              <IoMdArrowRoundBack fontSize="1.2em" />
              <span> </span>Trở về mua sắm
            </div>
          </Link>
        </section>
        <div className="header">
          <img className="img-header" src={blog1} alt="banner" />
          <p className="text-header">Shop bán điện thoại UITphone</p>
        </div>
        <div className="container-us"></div>
      </React.Fragment>
    );
  }
}

export default withRouter(About);
