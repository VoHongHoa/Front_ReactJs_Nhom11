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
import FacebookLogin from "react-facebook-login";
import "./Login.scss";
import { toast } from "react-toastify";
// import { verify } from "argon2";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowpassword: true,
      isOpenModal: false,
      // isLogin: false,
    };
  }
  componentDidMount() {}
  componentDidUpdate(preProps) {}
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
          phoneNumber: "",
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
        console.log(this.state.password);
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
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 text-center textLogin">Đăng nhập</div>
              <div className="col-12 form-group login-input">
                <label>Username:</label>
                <input
                  type="text"
                  value={this.state.username}
                  onChange={(event) => this.handleOnChangeUsername(event)}
                  placeholder="Enter your username"
                  className="form-control"
                  autoFocus
                />
              </div>
              <div className="col-12 form-group login-input">
                <label>Password:</label>

                <div className="custom-password">
                  <input
                    type={this.state.isShowpassword ? "password" : "text"}
                    value={this.state.password}
                    onChange={(event) => this.handleOnChangePassword(event)}
                    placeholder="Enter your password"
                    className="form-control"
                    onKeyPress={(event) => this.handelKeyPressLogin(event)}
                  />
                  <span onClick={() => this.handleShowHidePassword()}>
                    <i
                      className={
                        this.state.isShowpassword
                          ? "fas fa-eye"
                          : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              {/* <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div> */}
              <div className="btn-div">
                <button
                  className="btn-login"
                  onClick={() => this.handleLoginSubmit()}
                >
                  Đăng nhập
                </button>
                <div className="mt-2">
                  <p
                    className="text"
                    onClick={() => this.handleForgotPassword()}
                  >
                    Quên mật khẩu?
                  </p>
                </div>
              </div>

              <div className="btn-div">
                <div className="mt-1">
                  <p>
                    Bạn chưa có tài khoản?
                    <span
                      className="text"
                      onClick={() => this.handleOpenModal()}
                    >
                      Đăng kí
                    </span>
                  </p>

                  <GoogleLogin
                    clientId="1000261381053-acnpjvmhm485p7aal87iicf70bvdm04a.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                  />
                  {/* <FacebookLogin
                      appId="1147433972769036" //APP ID NOT CREATED YET
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      icon="fa-facebook"
                      className="col-6"
                    /> */}
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
