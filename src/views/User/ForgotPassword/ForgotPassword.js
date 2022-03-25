import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../services/UserService";
import "./ForgotPassword.scss";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(preProps) {}
  handleReturnLogin = () => {
    this.props.history.push("/login");
  };
  handleOnchangeInput = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleResetPassword = async () => {
    let res = await forgotPassword(this.state);
    console.log(res);
    if (res && res.errCode === 1) {
      toast.success(res.message);
    } else {
      toast.error("Gửi email không thành công");
    }
  };
  render() {
    console.log(this.state);
    return (
      <div className="forgot-password-background">
        <div className="container-center">
          <div className="logo">
            <i className="fab fa-phoenix-squadron fa-8x"></i>
          </div>
          <div className="content">
            <h4>
              Cung cấp Email của bạn và chúng tôi sẽ tiền hành cập nhập lại
              password
            </h4>
            <div className="email-container">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập email mà bạn đã đăng kí tài khoản"
                onChange={(event) => this.handleOnchangeInput(event)}
              />
            </div>
            <div className="btn-submit">
              <button
                className="btn btn-primary mt-2"
                onClick={() => this.handleResetPassword()}
              >
                Gửi mail xác nhận
              </button>
            </div>

            <p>
              Bạn đã nhớ?{" "}
              <span
                className="return-login"
                onClick={() => this.handleReturnLogin()}
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </div>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
