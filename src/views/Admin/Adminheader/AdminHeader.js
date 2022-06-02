import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import "./AdminHeader.scss";
class AdminHeader extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="admin-header-container">
        <div className="topnav">
          <div className="item-manage ">
            <NavLink to="/admin" activeClassName="active" exact={true}>
              <i
                className="fa-solid fa-table"
                style={{ marginRight: "15px" }}
              ></i>
              Thống kê
            </NavLink>
            <NavLink to="/admin/user" activeClassName="active" exact={true}>
              <i
                className="fa-solid fa-users"
                style={{ marginRight: "15px" }}
              ></i>
              Người dùng
            </NavLink>
            <NavLink to="/admin/product" activeClassName="active" exact={true}>
              <i
                className="fa-solid fa-calculator"
                style={{ marginRight: "15px" }}
              ></i>
              Sản phẩm
            </NavLink>
            <NavLink to="/admin/order" activeClassName="active" exact={true}>
              <i
                className="fa-solid fa-money-bill"
                style={{ marginRight: "15px" }}
              ></i>
              Đơn hàng
            </NavLink>
          </div>
          {/* <div className="admin-name col-3">
            {userInfor && userInfor.user && userInfor.user.fullname && (
              <button className="btn btn-light">
                Wel,{userInfor.user.fullname}{" "}
              </button>
            )}
          </div> */}
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(AdminHeader)
);
