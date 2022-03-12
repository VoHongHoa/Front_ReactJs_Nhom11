import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ModalRegister from "../Register/ModalRegister";
import { handleLogin, handlegetUserInfor } from "../../services/UserService";
import { handleSaveUserInforRedux } from "../../store/actions/AppAction";
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
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
    //console.log(event.target.value)
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    // console.log(event.target.value)
  };

  handleShowHidePassword = () => {
    //alert("click hide")
    this.setState({
      isShowpassword: !this.state.isShowpassword,
    });
  };
  handelKeyPressLogin = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  handleLogin = async () => {
    //console.log("check state:", this.state);
    let respone = await handleLogin({
      username: this.state.username,
      password: this.state.password,
    });
    //console.log("check respone:", respone);
    if (respone && respone.success === false) {
      toast.error(respone.message);
    } else {
      let accessToken = respone.tokens.accessToken;
      let userInfor = await handlegetUserInfor(accessToken);
      console.log("userInfor:", userInfor);
      this.props.handleSaveUserInforRedux(userInfor);
      this.props.history.push("/");
    }
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
  render() {
    //JSX
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
              <div className="col-6 btn-div">
                <button
                  className="btn-login"
                  onClick={() => this.handleLogin()}
                >
                  Đăng nhập
                </button>
              </div>

              <div className="col-6 btn-div">
                <button
                  className="btn-login"
                  onClick={() => this.handleOpenModal()}
                >
                  Đăng kí
                </button>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSaveUserInforRedux: (data) =>
      dispatch(handleSaveUserInforRedux(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
