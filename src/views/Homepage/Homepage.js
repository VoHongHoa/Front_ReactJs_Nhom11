import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import Homeheader from "./Homeheader/Homeheader";
import HomeFooter from "./HomeFooter/HomeFooter";
import "./Homepage.scss";
class HomePage extends Component {
  //   returnToHome = () => {
  //     this.props.history.push(path.HOMEPAGE);
  //   };
  componentDidMount() {}
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <React.Fragment>
        <section className="homepage-header-container">
          <Homeheader />
        </section>

        <div className="slide-container mt-2 mb-4">
          <Slider {...settings}>
            <div className="banner-1"></div>
            <div className="banner-2"></div>
            <div className="banner-3"></div>
            <div className="banner-4"></div>
          </Slider>
          <div className="detail-banner col-5"></div>
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
