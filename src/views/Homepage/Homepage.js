import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import Homeheader from "./Homeheader/Homeheader";
import HomeFooter from "./HomeFooter/HomeFooter";
import SectionProducts from "./SectionProducts/SectionProducts";
import "./Homepage.scss";
class HomePage extends Component {
  componentDidMount() {}
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    return (
      <React.Fragment>
        <section className="homepage-header-container">
          <Homeheader />
        </section>

        <div className="slide-container mt-2 mb-4">
          <Slider {...settings} className="col-8">
            <div className="banner-1"></div>
            <div className="banner-2"></div>
            <div className="banner-3"></div>
            <div className="banner-4"></div>
          </Slider>
          <div className="detail-banner col-4">
            <div className="logo">
              <i className="fab fa-phoenix-squadron fa-8x"></i>
            </div>
            <div className="slogan">UITPHONE</div>
          </div>
        </div>
        <div className="section-product mt-2 mb-2">
          <SectionProducts />
        </div>
        <HomeFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
