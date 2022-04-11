import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import { addToCart } from "../../store/actions/AppAction";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { getAllProduct } from "../../services/ProductService";
import "./Products.scss";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProduct: [],
    };
  }
  async componentDidMount() {
    let res = await getAllProduct();
    // console.log(res);
    if (res) {
      this.setState({
        allProduct: res.products,
      });
    }
  }
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  render() {
    let { allProduct } = this.state;
    return (
      <div className="container-fluid product-page">
        <Homeheader />
        <section id="sidebar">
          <p>
            Home | <b>SamSum</b>
          </p>
        </section>
        <div className="filter-container mb-2 mt-2">
          <div className="filter">
            <div className="filter-content mb-2">
              <div className="pb-2 ml-2">
                <h4>Ram</h4>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="2GB"
                />
                <label className="form-check-label" htmlFor="2GB">
                  2GB
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="4GB"
                />
                <label className="form-check-label" htmlFor="4GB">
                  4GB
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="8GB"
                />
                <label className="form-check-label" htmlFor="8GB">
                  8GB
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="16GB"
                />
                <label className="form-check-label" htmlFor="16GB">
                  16GB
                </label>
              </div>
            </div>
            <div className="filter-content">
              <div className="pb-2 ml-2">
                <h4>Màu</h4>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="mau_do"
                />
                <label className="form-check-label" htmlFor="mau_do">
                  Đỏ
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="4GB"
                />
                <label className="form-check-label" htmlFor="4GB">
                  4GB
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="8GB"
                />
                <label className="form-check-label" htmlFor="8GB">
                  8GB
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="16GB"
                />
                <label className="form-check-label" htmlFor="16GB">
                  16GB
                </label>
              </div>
            </div>
            <div className="filter-content">
              <div className="pb-2 ml-2">
                <h4>Rom</h4>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="2GB"
                />
                <label className="form-check-label" htmlFor="2GB">
                  2GB
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="4GB"
                />
                <label className="form-check-label" htmlFor="4GB">
                  4GB
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="8GB"
                />
                <label className="form-check-label" htmlFor="8GB">
                  8GB
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="16GB"
                />
                <label className="form-check-label" htmlFor="16GB">
                  16GB
                </label>
              </div>
            </div>
          </div>
          <div className="filter-product-content">
            {allProduct &&
              allProduct.length > 0 &&
              allProduct.map((item, index) => {
                return (
                  <div className="grid-product" key={item._id}>
                    <div className="product">
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
                  </div>
                );
              })}

            {/* <div className="grid-product">2</div>
            <div className="grid-product">3</div>
            <div className="grid-product">4</div>
            <div className="grid-product">5</div> */}
          </div>
          <div className="filter-content"></div>
        </div>
        <HomeFooter />
      </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Products)
);
