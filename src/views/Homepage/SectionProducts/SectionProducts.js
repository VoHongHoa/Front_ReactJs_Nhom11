import React, { Component } from "react";
import { connect } from "react-redux";
import "./SectionProduct.scss";
import { withRouter } from "react-router";
import { getTopProduct } from "../../../services/ProductService";
import { addToCart } from "../../../store/actions/AppAction";
import { formatPrice } from "../../../constants/format";
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
  handleViewDetailProduct = (product) => {
    this.props.history.push(`/detail-product/${product._id}`);
  };
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };

  render() {
    let { topProduct } = this.state;

    return (
      <>
        <div className="section-product-container">
          <span className="text-product">
            <p className="title">Danh sách sản phẩm nổi bật</p>
          </span>
          <div className="container d-flex justify-content-center mt-50 mb-50 product-slide">
            <div className="row">
              {topProduct &&
                topProduct.length > 0 &&
                topProduct.map((item, index) => {
                  return (
                    <div className="col-md-3 mt-2" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <div className="card-img-actions">
                            <img
                              src={item.img}
                              className="card-img img-fluid"
                              width="96"
                              height="350"
                              alt={item.title}
                              onClick={() => this.handleViewDetailProduct(item)}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>

                        <div className="card-body bg-light text-center">
                          <div className="mb-2">
                            <h6 className="font-weight-semibold mb-2">
                              <a
                                href="#"
                                className="text-default mb-2"
                                data-abc="true"
                              >
                                {item.desc}
                              </a>
                            </h6>

                            <a href="#" className="text-muted" data-abc="true">
                              {item.title}
                            </a>
                          </div>

                          <h3 className="mb-0 font-weight-semibold">
                            {formatPrice(item.price)}
                          </h3>

                          <div>
                            <i className="fa fa-star star"></i>
                            <i className="fa fa-star star"></i>
                            <i className="fa fa-star star"></i>
                            <i className="fa fa-star star"></i>
                          </div>

                          <div className="text-muted mb-3">34 đánh giá</div>

                          <button
                            type="button"
                            className="btn bg-cart"
                            onClick={() => this.handleAddToCart(item)}
                          >
                            <i className="fa fa-cart-plus mr-2"></i> Thêm vào
                            giỏ hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
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
{
  /* <div  key={item._id}>
                      <div className="product-content">
                        <div
                          className="card"
                          onClick={() => this.handleViewDetailProduct(item)}
                          style={{ cursor: "pointer" }}
                        >
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
                      
                    </div> */
}
