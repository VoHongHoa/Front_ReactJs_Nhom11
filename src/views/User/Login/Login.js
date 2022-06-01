import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ModalRegister from "../Register/ModalRegister";
import {
  findUserByEmail,
  handleRegisterUser,
} from "../../../services/UserService";
import { handleLogin } from "../../../store/actions/AppAction";
import { logOutSuccess } from "../../../store/actions/AppAction";
import GoogleLogin from "react-google-login";
import "./Login.scss";
import { toast } from "react-toastify";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowpassword: true,
      isOpenModal: false,
    };
  }
  componentDidMount() {}

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowpassword: !this.state.isShowpassword,
    });
  };
  handelKeyPressLogin = (event) => {
    if (event.key === "Enter") {
      this.handleLoginSubmit();
    }
  };
  handleLoginSubmit = async () => {
    this.props.handleLogin({
      username: this.state.username,
      password: this.state.password,
    });
    // setTimeout(() => this.props.logOutSuccess(), 24 * 60 * 60 * 1000);
  };
  handleOpenModal = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  handleForgotPassword = () => {
    this.props.history.push("/forgotpassword");
  };

  responseGoogle = async (response) => {
    console.log(response);
    if (response) {
      let userInfor = response.profileObj;
      let res = await findUserByEmail(userInfor.email);
      if (res.errCode === 1) {
        this.setState({
          username: userInfor.email,
          password: process.env.REACT_APP_DEFAULT_GOOGLE_PASSWORD,
        });
        let data = {
          email: userInfor.email,
          password: this.state.password,
          username: userInfor.email,
          address: "",
          phonenumber: "",
          fullname: userInfor.name,
          img: userInfor.imageUrl,
        };
        await handleRegisterUser(data);
        this.handleLoginSubmit();
      } else {
        this.setState({
          username: res.user.username,
          password: process.env.REACT_APP_DEFAULT_GOOGLE_PASSWORD,
        });
        this.handleLoginSubmit();
      }
    } else {
      toast.error("Đăng nhập không thành công!!");
    }
  };
  responseFacebook = (response) => {
    console.log(response);
  };
  render() {
    return (
      <>
        <div className="container login-container 100-vh">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">
                    Sign In
                  </h5>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="username"
                      value={this.state.username}
                      onChange={(event) => this.handleOnChangeUsername(event)}
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(event) => this.handleOnChangePassword(event)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberPasswordCheck"
                    >
                      Remember password
                    </label>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      onClick={() => this.handleLoginSubmit()}
                    >
                      Sign in
                    </button>
                  </div>
                  <div
                    className="d-grid mt-2 d-flex more-action "
                    style={{ justifyContent: "space-between" }}
                  >
                    <p>
                      Bạn chưa có tài khoản?{" "}
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => this.handleOpenModal()}
                      >
                        {" "}
                        Đăng kí
                      </span>
                    </p>
                    <span
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => this.handleForgotPassword()}
                    >
                      Quên mật khẩu?
                    </span>
                  </div>
                  <hr className="my-4" />

                  <div className="d-grid mt-2">
                    <GoogleLogin
                      clientId={process.env.REACT_APP_CLIENT_ID_LOGIN_GOOGLE}
                      buttonText="LOGIN WITH GOOGLE"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      cookiePolicy={"single_host_origin"}
                      className=" btn btn-google"
                      style={{ justifyContent: "center" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalRegister
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleFromParent}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (data) => dispatch(handleLogin(data)),
    logOutSuccess: () => dispatch(logOutSuccess()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
