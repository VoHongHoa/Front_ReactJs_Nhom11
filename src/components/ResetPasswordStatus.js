import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { doResetPassword } from "../services/UserService";
import HomeFooter from "../views/Homepage/HomeFooter/HomeFooter";
import Homeheader from "../views/Homepage/Homeheader/Homeheader";
// import RecomProduct from "./RecomProduct/RecomProduct";
class HomePage extends Component {
  componentDidMount() {
    this.doResetPassword();
  }
  doResetPassword = async () => {
    // console.log(this.props.match.params);
    let { email, newPassword } = this.props.match.params;
    try {
      let data = {
        email: email,
        newPassword: newPassword,
      };
      let res = await doResetPassword(data);
      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Lỗi hệ thống!");
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <section className="homepage-header-container">
            <Homeheader />
          </section>
          <div className="content-status">
            <p>Cập nhập password thành công! Vui lòng đăng nhập lại</p>
          </div>
          <HomeFooter />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
