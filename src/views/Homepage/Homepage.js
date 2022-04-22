import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import Homeheader from "./Homeheader/Homeheader";
import HomeFooter from "./HomeFooter/HomeFooter";
import SectionProducts from "./SectionProducts/SectionProducts";
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
        <div className="container-fluid">
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
          {/* 
          <div className="section-product mt-2 mb-2">
            <RecomProduct />
          </div> */}

          <div className="product-collection mb-2">
            <div className="product-collection-wrapper">
              {/* <!-- product col left --> */}
              <div className="product-col-left">
                <div className="product-col-content">
                  <h2 className="sm-title">MEN'S SHOES </h2>
                  <h2 className="md-title">Men's Collection </h2>
                  <p className="text-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae consequatur facilis eligendi quibusdam
                    voluptatibus exercitationem autem voluptatum, beatae
                    architecto odit, quisquam repellat. Deleniti, architecto ab.
                  </p>
                  <button type="button" className="btn-dark">
                    Shop now
                  </button>
                </div>
              </div>

              {/* <!-- product col right --> */}
              <div className="product-col-right">
                <div className="product-col-r-top">
                  <div className="product-col-content">
                    <h2 className="sm-title">women's dresses </h2>
                    <h2 className="md-title">women's collection </h2>
                    <p className="text-light">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Molestiae consequatur facilis eligendi quibusdam
                      voluptatibus exercitationem autem voluptatum, beatae
                      architecto odit, quisquam repellat. Deleniti, architecto
                      ab.
                    </p>
                    <button type="button" className="btn-dark">
                      Shop now
                    </button>
                  </div>
                </div>

                <div className="product-col-r-bottom">
                  {/* <!-- left --> */}
                  <div className="flex">
                    <div className="product-col-content">
                      <h2 className="sm-title">summer sale </h2>
                      <h2 className="md-title">Extra 50% Off </h2>
                      <p className="text-light">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Molestiae consequatur facilis eligendi quibusdam
                        voluptatibus exercitationem autem voluptatum, beatae
                        architecto odit, quisquam repellat. Deleniti, architecto
                        ab.
                      </p>
                      <button type="button" className="btn-dark">
                        Shop now
                      </button>
                    </div>
                  </div>
                  {/* <!-- right --> */}
                  <div className="flex">
                    <div className="product-col-content">
                      <h2 className="sm-title">shoes </h2>
                      <h2 className="md-title">best sellers </h2>
                      <p className="text-light">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Molestiae consequatur facilis eligendi quibusdam
                        voluptatibus exercitationem autem voluptatum, beatae
                        architecto odit, quisquam repellat. Deleniti, architecto
                        ab.
                      </p>
                      <button type="button" className="btn-dark">
                        Shop now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
