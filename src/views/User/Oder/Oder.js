import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Homeheader from "../../Homepage/Homeheader/Homeheader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
import "./Order.scss";
import { addNewOder } from "../../../services/OderService";
import { deleteCart } from "../../../store/actions/AppAction";
import { toast } from "react-toastify";
import PayPalCheckoutButton from "../../../components/PayPalCheckoutButton";
import _ from "lodash";
class Oder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      address: "",
      phonenumber: "",
      payMent: "Chưa thanh toán",
    };
  }
  componentDidMount() {
    //console.log(_.isEmpty(this.props.userInfor.user));
    if (_.isEmpty(this.props.userInfor.user) === false) {
      this.setState({
        fullName: this.props.userInfor.user.fullname,
        address: this.props.userInfor.user.address,
        phonenumber: this.props.userInfor.user.phonenumber,
      });
    }
  }
  componentDidUpdate(preProps) {}
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkInput = () => {
    let isValid = true;
    let arr = ["fullName", "address", "phonenumber"];
    let copyState = { ...this.state };
    for (let i = 0; i < arr.length; i++) {
      if (copyState[arr[i]] === "") {
        toast.error(`Vui lòng điền thông tin ${arr[i]}`);
        isValid = false;
        break;
      }
    }
    return isValid;
  };
  handleSubmit = async (total) => {
    let products = this.props.itemInCart;
    if (products && products.length > 0) {
      products.map((item, index) => {
        delete item.img;
        return item;
      });
      let data = {
        userId: this.props.userInfor.user._id,
        products: this.props.itemInCart,
        address: this.state.address,
        amount: total,
        payStatus: this.state.payMent,
      };
      if (this.checkInput()) {
        let res = await addNewOder(data);
        if (res) {
          toast.success("Xác nhận mua hàng thành công");
          this.props.deleteCart();
          this.props.history.push("/");
        }
      }
    }
  };
  changePayment = () => {
    this.setState({
      payMent: "Đã Thanh toán",
    });
  };
  render() {
    let { fullName, address, phonenumber } = this.state;
    let allItems = this.props.itemInCart;
    let total = 0;
    return (
      <div className="container order-container">
        <Homeheader />
        <div className="col-12 mt-3 ">
          <div className="mb-3 col-8">
            <div className="logo ">
              <i className="fab fa-phoenix-squadron fa-8x"></i>
            </div>
            <div className="form-group mt-2 col-12">
              <label>Tên khách hàng</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter user fullname"
                value={fullName}
                readOnly
              />
            </div>

            <div className="form-group mt-2 col-12">
              <label>Địa chỉ giao hàng</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                value={address}
                onChange={(event) => this.handleOnchangeInput(event, "address")}
              />
            </div>

            <div className="form-group mt-2 col-12">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phonenumber"
                value={phonenumber}
                onChange={(event) =>
                  this.handleOnchangeInput(event, "phonenumber")
                }
              />
            </div>
          </div>
          <div className="detail-order col-8 mb-3 ">
            <div className="detail-order-table">
              <table>
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Hình ảnh</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {allItems &&
                    allItems.length > 0 &&
                    allItems.map((item, index) => {
                      total = total + item.price * item.quantity;
                      return (
                        <tr key={item._id}>
                          <td>{item.title}</td>
                          <td>{item.price}</td>
                          <td>
                            <div
                              className="img-product"
                              style={{
                                backgroundImage: `url(${item.img})`,
                                height: "80px",
                                width: "60px",
                                backgroundPosition: "center",
                                backgroundRepeat: "none",
                                backgroundSize: "cover",
                              }}
                            ></div>
                          </td>
                          <td>
                            <p>{item.quantity}</p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-primary col-12 mt-3"
              onClick={() => this.handleSubmit(total)}
            >
              Thanh toán khi nhận hàng
            </button>
            <PayPalCheckoutButton
              total={total}
              handleSubmit={this.handleSubmit}
              checkInput={this.checkInput}
              changePayment={this.changePayment}
            />
          </div>
        </div>
        <HomeFooter />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    itemInCart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCart: () => dispatch(deleteCart()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Oder));
