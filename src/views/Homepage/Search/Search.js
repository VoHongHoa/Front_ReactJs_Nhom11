import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import HomeFooter from "../HomeFooter/HomeFooter";
import Homeheader from "../Homeheader/Homeheader";
import "./Search.scss";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProduct: [],
    };
  }
  componentDidMount() {}
  handleViewDetailProduct = (product) => {
    this.props.history.push(`/detail-product/${product._id}`);
  };
  render() {
    return (
      <React.Fragment>
        <Homeheader />
        <div className="filter-product-content">
          {this.props.allProduct && this.props.allProduct.length > 0 ? (
            this.props.allProduct.map((item, index) => {
              return (
                <div className="grid-product" key={item._id}>
                  <div className="product">
                    <div className="product-content">
                      <div className="card" style={{ cursor: "pointer" }}>
                        <div onClick={() => this.handleViewDetailProduct(item)}>
                          <div
                            className="img-product"
                            style={{
                              backgroundImage: `url(${item.base64Img})`,
                            }}
                          ></div>
                          <span>{item.title}</span>
                          <p className="price">{item.price}</p>
                          <p>{item.desc}</p>
                        </div>
                        <p>
                          <button onClick={() => this.handleAddToCart(item)}>
                            Add to Cart
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="title">Không có sản phẩm nào</div>
          )}
        </div>
        <HomeFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProduct: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
