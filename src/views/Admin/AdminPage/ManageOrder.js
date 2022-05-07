import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../Adminheader/AdminHeader";
import { getAllOrder, deleteOrder } from "../../../services/OderService";
class ManageOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrder: [],
    };
  }
  async componentDidMount() {
    let respone = await getAllOrder();
    if (respone) {
      this.setState({
        allOrder: respone,
      });
    }
  }

  handleOpenModalEdit = (item) => {
    this.setState({
      isOpenModal: true,
      currentUserEdit: item,
    });
  };
  handleOnchangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  handleDeleteOrder = async (item) => {
    try {
      let res = await deleteOrder(item);
      if (res) {
        let respone = await getAllOrder();
        if (respone) {
          this.setState({
            allOrder: respone,
          });
        }
      }
    } catch (e) {
      console(e);
    }
  };
  render() {
    let { allOrder } = this.state;
    return (
      <div className="container-fluid">
        <AdminHeader />
        <div className="top-user-manage row mt-3">
          <span className="text-manage col-6">Quản lý hóa đơn</span>
          <div className="col-6 search-container">
            <input
              className="form-control"
              placeholder="Tìm kiếm hóa đơn theo tên, địa chỉ, quyền, ..."
            />
            <button type="submit" className="btn-submit">
              <i className="fa fa-search fa-2x"></i>
            </button>
          </div>
        </div>

        <div className="user-container mt-3">
          <table id="customers">
            <thead>
              <tr>
                <th rowSpan={2}>STT</th>
                <th rowSpan={2}>Họ và tên</th>
                <th colSpan={2}>Products</th>
                <th rowSpan={2}>Address</th>
                <th rowSpan={2}>Status</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {allOrder &&
                allOrder.length > 0 &&
                allOrder.map((item, index) => {
                  let rowSpan = item.products.length;
                  return (
                    <>
                      <tr key={item._id}>
                        <td rowSpan={rowSpan}>{index}</td>
                        <td rowSpan={rowSpan}>{item.user[0]?.fullname}</td>
                        <td>{item.product[0].title}</td>
                        <td>{item.products[0].quantity}</td>
                        <td rowSpan={rowSpan}>{item.address}</td>
                        <td rowSpan={rowSpan}>{item.status}</td>
                        <td rowSpan={rowSpan} className="action-edit-del-order">
                          <i className="fas fa-edit fa-2x"></i>
                          <i
                            className="fas fa-trash fa-2x"
                            onClick={() => this.handleDeleteOrder(item)}
                          ></i>
                        </td>
                      </tr>
                      {item.product.map((i, index) => {
                        if (index > 0) {
                          return (
                            <tr key={i._id}>
                              <td>{i.title}</td>
                              <td>{item.products[index].quantity}</td>
                            </tr>
                          );
                        }
                        return;
                      })}
                    </>
                  );
                })}
            </tbody>
          </table>
          <table></table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageOrder)
);
