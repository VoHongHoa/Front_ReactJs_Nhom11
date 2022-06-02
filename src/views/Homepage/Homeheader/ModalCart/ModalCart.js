import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { formatPrice } from "../../../../constants/format";
import {
  deleteItem,
  deleteCart,
  changeInputItem,
} from "../../../../store/actions/AppAction";
import Homeheader from "../Homeheader";
import HomeFooter from "../../HomeFooter/HomeFooter";
import "./ModalCart.scss";
class ModalCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
    };
  }
  componentDidMount() {
    this.setState({
      allItems: this.props.itemInCart,
    });
  }
  componentDidUpdate() {
    if (this.state.allItems !== this.props.itemInCart) {
      this.setState({
        allItems: this.props.itemInCart,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnchangeInput = (event, item) => {
    let copyState = { ...this.state };
    let quantity = event.target.value;
    for (let index = 0; index < copyState.allItems.length; index++) {
      if (copyState.allItems[index]._id === item._id) {
        copyState.allItems[index].quantity = quantity;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItems);
  };
  handleDeleteItem = (item) => {
    this.props.deleteItem(item);
    this.setState({
      allItems: this.props.itemInCart,
    });
  };
  handleSubmit = () => {
    this.props.history.push("/order");
  };
  handleIncreaseQuantity = (item) => {
    let copyState = { ...this.state };
    for (let index = 0; index < copyState.allItems.length; index++) {
      if (copyState.allItems[index]._id === item._id) {
        copyState.allItems[index].quantity =
          parseInt(copyState.allItems[index].quantity) + 1;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItems);
  };
  handleDeleteBook = (item) => {
    this.props.deleteItem(item);
  };

  handleDecreaseQuantity = (item) => {
    let copyState = { ...this.state };
    for (let index = 0; index < copyState.allItems.length; index++) {
      if (copyState.allItems[index]._id === item._id && item.quantity > 1) {
        copyState.allItems[index].quantity =
          parseInt(copyState.allItems[index].quantity) - 1;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItems);
  };
  render() {
    let { allItems } = this.state;
    let total = 0;
    return (
      <div className=" container cart-container ">
        <section className="homepage-header-container">
          <Homeheader />
        </section>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">
                      Giỏ hàng - {allItems.length} sản phẩm
                    </h5>
                  </div>
                  <div className="card-body">
                    {allItems &&
                      allItems.length > 0 &&
                      allItems.map((item, index) => {
                        total = total + item.price * item.quantity;
                        return (
                          <div key={index}>
                            <div className="row">
                              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                <div
                                  className="bg-image hover-overlay hover-zoom ripple rounded"
                                  data-mdb-ripple-color="light"
                                >
                                  <img
                                    src={item.img}
                                    className="w-100"
                                    alt={item.title}
                                  />
                                  <a href="#!">
                                    <div
                                      className="mask"
                                      style={{
                                        backgroundColor:
                                          "rgba(251, 251, 251, 0.2)",
                                      }}
                                    ></div>
                                  </a>
                                </div>
                              </div>

                              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                <p>
                                  <strong>{item.title}</strong>
                                </p>
                                <p>Màu: {item.color}</p>
                                <p>Ram: {item.ram}</p>
                                <p>Rom: {item.rom}</p>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm me-1 mb-2"
                                  data-mdb-toggle="tooltip"
                                  title="Remove item"
                                  onClick={() => this.handleDeleteItem(item)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm mb-2"
                                  data-mdb-toggle="tooltip"
                                  title="Move to the wish list"
                                >
                                  <i className="fas fa-heart"></i>
                                </button>
                              </div>

                              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <div
                                  className="d-flex mb-4"
                                  style={{ maxWidth: "300px" }}
                                >
                                  <button
                                    className="btn btn-primary px-3 me-2"
                                    onClick={() =>
                                      this.handleDecreaseQuantity(item)
                                    }
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>

                                  <div className="form-outline">
                                    <input
                                      min="0"
                                      name="quantity"
                                      value={item.quantity}
                                      onChange={(event) =>
                                        this.handleOnchangeInput(event, item)
                                      }
                                      type="number"
                                      className="form-control"
                                    />
                                  </div>

                                  <button
                                    className="btn btn-primary px-3 ms-2"
                                    onClick={() =>
                                      this.handleIncreaseQuantity(item)
                                    }
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>

                                <p className="text-start text-md-center">
                                  Giá:
                                  <strong>{formatPrice(item.price)}</strong>
                                </p>
                              </div>
                            </div>
                            <hr className="my-4" />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-body">
                    <p>
                      <strong>Thời gian giao hàng dự kiến</strong>
                    </p>
                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                  </div>
                </div>
                <div className="card mb-4 mb-lg-0">
                  <div className="card-body">
                    <p>
                      <strong>Chấp nhận thanh toán</strong>
                    </p>
                    <img
                      className="me-2"
                      width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                      alt="Visa"
                    />
                    <img
                      className="me-2"
                      width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                      alt="American Express"
                    />
                    <img
                      className="me-2"
                      width="45px"
                      src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                      alt="Mastercard"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Bản tóm tắt hóa đơn</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Giá trị đơn hàng:
                        <span>{formatPrice(total)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Phí vận chuyển
                        <span>Miễn phí</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Tổng hóa đơn</strong>
                          <strong>
                            <p className="mb-0">(Bao gồm thuế VAT)</p>
                          </strong>
                        </div>
                        <span>
                          <strong>{formatPrice(total)}</strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block"
                      onClick={() => this.handleSubmit(total)}
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <HomeFooter></HomeFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemInCart: state.cart.cart,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (item) => dispatch(deleteItem(item)),
    deleteCart: () => dispatch(deleteCart()),
    changeInputItem: (allItems) => dispatch(changeInputItem(allItems)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalCart)
);
