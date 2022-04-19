import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import { addToCart } from "../../store/actions/AppAction";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { findProduct, getProductByFilter } from "../../services/ProductService";
import "./Products.scss";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProduct: [],
      filterPrice: [],
    };
  }
  componentDidMount() {
    this.getAllProductByCategory();
  }
  setSelectedPrice = () => {
    let Price = [
      "Tất cả",
      300000,
      1000000,
      3000000,
      5000000,
      10000000,
      20000000,
      30000000,
    ];
    let arrPrice = [];
    for (let i = 0; i < Price.length; i++) {
      let objectPrice = {};
      if (i === 0) {
        objectPrice.label = Price[i];
      } else {
        objectPrice.label = `Từ ${Price[i]}`;
      }
      objectPrice.value = Price[i];
      arrPrice.push(objectPrice);
    }
    return arrPrice;
  };
  getAllProductByCategory = async () => {
    let res = await findProduct("SamSum");
    if (res) {
      this.setState({
        allProduct: res.product,
        filterPrice: this.setSelectedPrice(),
        selectedFilter: "",
      });
    }
  };
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  handelOnchangeSelect = async (event) => {
    let filterCondition = event.target.value;
    if (filterCondition === "Tất cả") {
      this.getAllProductByCategory();
    } else {
      let data = {
        category: "SamSum",
        filterCondition: filterCondition,
      };
      let res = await getProductByFilter(data);
      if (res && res.errCode === 1) {
        this.setState({
          allProduct: res.products,
        });
      }
    }
  };
  render() {
    let { allProduct, filterPrice } = this.state;
    //console.log(this.state);
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
            <div className="all-availble-price mb-2">
              <div className="title-select">Giá: </div>
              <select
                className="select-price"
                onChange={(event) => this.handelOnchangeSelect(event)}
              >
                {filterPrice &&
                  filterPrice.length > 0 &&
                  filterPrice.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="filter-product-content">
            {allProduct && allProduct.length > 0 ? (
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
              })
            ) : (
              <div className="title">Không có sản phẩm nào</div>
            )}
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
