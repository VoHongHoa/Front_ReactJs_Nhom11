import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../Adminheader/AdminHeader";
import "./ProductManage.scss";
class ProductManage extends Component {
  componentDidMount() {}
  render() {
    return (
      <>
        <AdminHeader />
        <p>Hello Manage product</p>
      </>
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
  connect(mapStateToProps, mapDispatchToProps)(ProductManage)
);
