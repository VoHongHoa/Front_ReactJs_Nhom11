import React, { Component } from "react";
import { connect } from "react-redux";
import "./SectionProduct.scss";
import { withRouter } from "react-router";
import Slider from "react-slick";
import { getTopProduct } from "../../../services/ProductService";
import { addToCart } from "../../../store/actions/AppAction";
class SectionProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topProduct: [],
    };
  }
  async componentDidMount() {
    let res = await getTopProduct();
    if (res && res.errCode === 1) {
      this.setState({
        topProduct: res.products,
      });
    }
  }
  componentDidUpdate(preProps) {}
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let { topProduct } = this.state;
    return (
      <>
        <div className="section-product-container">
          <span className="text-product">Danh sách sản phẩm nổi bậc</span>
          <div className="product-slide">
            <Slider {...settings}>
              {topProduct &&
                topProduct.length > 0 &&
                topProduct.map((item, index) => {
                  return (
                    <div className="product" key={item._id}>
                      <div className="product-content">
                        <div className="card">
                          <div
                            className="img-product"
                            style={{
                              backgroundImage: `url(${item.base64Img})`,
                            }}
                          ></div>
                          <span>{item.title}</span>
                          <p className="price">{item.price}</p>
                          <p>{item.desc}</p>
                          <p>
                            <button onClick={() => this.handleAddToCart(item)}>
                              Add to Cart
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SectionProducts)
);
