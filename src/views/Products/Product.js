import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import { addToCart } from "../../store/actions/AppAction";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { findProduct, getProductByFilter } from "../../services/ProductService";
import "./Products.scss";
import { toast } from "react-toastify";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProduct: [],
      filterPrice: [],
      filterRam: [],
      filterRom: [],
      selectedPrice: "",
      selectedRam: "",
      selectedRom: "",
      category: "",
    };
  }
  componentDidMount() {
    this.getAllProductByCategory(this.props.match.params.category);
  }
  componentDidUpdate(preProps) {
    if (preProps.match.params !== this.props.match.params) {
      this.getAllProductByCategory(this.props.match.params.category);
    }
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
        objectPrice.value = "";
      } else {
        objectPrice.label = `Từ ${Price[i]}`;
        objectPrice.value = Price[i];
      }

      arrPrice.push(objectPrice);
    }
    return arrPrice;
  };
  setSelectedRam = () => {
    let ram = ["Tất cả", " 2GB", "4GB", "8GB", "16GB", "32GB", "64GB"];
    let arrRam = [];
    for (let i = 0; i < ram.length; i++) {
      let objectRam = {};
      if (i === 0) {
        objectRam.value = "";
      } else {
        objectRam.value = ram[i];
      }
      objectRam.label = ram[i];

      arrRam.push(objectRam);
    }
    return arrRam;
  };
  setSelectedRom = () => {
    let rom = ["Tất cả", " 16GB", "32GB", "64GB", "128GB", "256GB", "512GB"];
    let arrRom = [];
    for (let i = 0; i < rom.length; i++) {
      let objectRom = {};
      if (i === 0) {
        objectRom.value = "";
      } else {
        objectRom.value = rom[i];
      }
      objectRom.label = rom[i];

      arrRom.push(objectRom);
    }
    return arrRom;
  };
  getAllProductByCategory = async (category) => {
    let res = await findProduct(category);
    if (res) {
      this.setState({
        allProduct: res.product,
        filterPrice: this.setSelectedPrice(),
        filterRam: this.setSelectedRam(),
        filterRom: this.setSelectedRom(),
      });
    }
  };
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  handleOnchangeSelect = (event, id) => {
    let name = id;
    let copyState = { ...this.state };
    copyState[name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  // handelOnchangeSelectPrice = async (event) => {
  //   let filterCondition = event.target.value;
  //   if (filterCondition === "Tất cả") {
  //     this.getAllProductByCategory();
  //   } else {
  //     let data = {
  //       category: "SamSum",
  //       filterCondition: filterCondition,
  //     };
  //     let res = await getProductByFilter(data);
  //     if (res && res.errCode === 1) {
  //       this.setState({
  //         allProduct: res.products,
  //       });
  //     }
  //   }
  // };
  handleFilterProduct = async () => {
    let data = {
      category: "SamSum",
      filterPrice: this.state.selectedPrice,
      filterRam: this.state.selectedRam,
      filterRom: this.state.selectedRom,
    };
    let res = await getProductByFilter(data);
    // console.log(res);
    if (res && res.errCode === 1) {
      toast.success(`Có ${res.products.length} sản phẩm`);
      this.setState({
        allProduct: res.products,
      });
    }
  };
  handleViewDetailProduct = (product) => {
    this.props.history.push(`/samsum/${product._id}`);
  };
  render() {
    let { allProduct, filterPrice, filterRam, filterRom } = this.state;
    //console.log(this.props.match.params.category);
    return (
      <div className="container-fluid product-page">
        <Homeheader />
        <section id="sidebar">
          <p>
            Home | <b>{this.props.match.params.category}</b>
          </p>
        </section>
        <div className="filter-container mb-2 mt-2">
          <div className="filter">
            <div className="all-availble-price mb-2">
              <div className="title-select">Giá: </div>
              <select
                className="select-price"
                onChange={(event) =>
                  this.handleOnchangeSelect(event, "selectedPrice")
                }
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
            <div className="all-availble-price mb-2">
              <div className="title-select">Ram: </div>
              <select
                className="select-price"
                onChange={(event) =>
                  this.handleOnchangeSelect(event, "selectedRam")
                }
              >
                {filterRam &&
                  filterRam.length > 0 &&
                  filterRam.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="all-availble-price mb-2">
              <div className="title-select">Rom: </div>
              <select
                className="select-price"
                onChange={(event) =>
                  this.handleOnchangeSelect(event, "selectedRom")
                }
              >
                {filterRom &&
                  filterRom.length > 0 &&
                  filterRom.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => this.handleFilterProduct()}
              >
                Lọc
              </span>
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
                            onClick={() => this.handleViewDetailProduct(item)}
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
