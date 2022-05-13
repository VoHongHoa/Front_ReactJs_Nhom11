import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import Homeheader from "./Homeheader/Homeheader";
import HomeFooter from "./HomeFooter/HomeFooter";
import SectionProducts from "./SectionProducts/SectionProducts";
import banner1 from "../../assets/images/banner-1.png";
import banner3 from "../../assets/images/banner-3.png";
import banner4 from "../../assets/images/banner-4.png";
import "./Homepage.scss";
// import RecomProduct from "./RecomProduct/RecomProduct";
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
        <div className="container">
          <section className="homepage-header-container">
            <Homeheader />
          </section>

          <div className="mt-2 mb-4">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block w-100" src={banner1} alt="First slide" />
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src={banner3} alt="Second slide" />
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src={banner4} alt="Third slide" />
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="section-product mt-2 mb-2">
            <SectionProducts />
          </div>
          {/* 
          <div className="section-product mt-2 mb-2">
            <RecomProduct />
          </div> */}
          <HomeFooter />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
