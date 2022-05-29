import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserOrder.scss";
import { withRouter } from "react-router";
import Homeheader from "./Homeheader";
import { getAllOrderByUserId } from "../../../services/OderService";
import { formatPrice } from "../../../constants/format";
import HomeFooter from "../HomeFooter/HomeFooter";

class UserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrder: [],
    };
  }
  componentDidMount() {
    this.getAllOrder();
  }
  getAllOrder = async () => {
    try {
      let res = await getAllOrderByUserId();
      console.log(res);
      if (res) {
        this.setState({
          allOrder: res,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let { allOrder } = this.state;
    return (
      <div className="user-order-container container">
        <section className="homepage-header-container">
          <Homeheader />
        </section>
        <div className="title">
          <p className="mt-2" style={{ textAlign: "center", fontSize: "30px" }}>
            Danh sách đơn hàng của người dùng
          </p>
        </div>
        <div className="user-order">
          {allOrder &&
            allOrder.length > 0 &&
            allOrder.map((item, index) => {
              return (
                <div key={item._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.product &&
                        item.product.length > 0 &&
                        item.product.map((i, index) => {
                          return (
                            <tr key={i._id}>
                              <th scope="row">{index + 1}</th>
                              <td>{i.title}</td>
                              <td>
                                <div
                                  className="img-product"
                                  style={{
                                    backgroundImage: `url(${i.img})`,
                                    height: "60px",
                                    width: "40px",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "none",
                                    backgroundSize: "cover",
                                  }}
                                ></div>
                              </td>
                              <td>{formatPrice(i.price)}</td>
                              <td>{item.products[index].quantity}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="detail-order">
                    <p style={{ fontWeight: "bold" }}>Chi tiết đơn hàng:</p>
                    <p>Ngày mua: {item.createdAt}</p>
                    <p>Người mua: {item.user[0].fullname}</p>
                    <p>Nơi nhận hàng: {item.address}</p>
                    <p>Trị giá đơn hàng: {formatPrice(item.amount)}</p>
                    <p>Trạng thái đơn hàng: {item.status}</p>
                    <p>Trạng thái thanh toán: {item.payStatus}</p>
                  </div>
                  <hr className="my-4" />
                </div>
              );
            })}
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserOrder)
);
