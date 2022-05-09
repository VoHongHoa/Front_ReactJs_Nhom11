import React, { Component } from "react";
import { connect } from "react-redux";
import Homeheader from "../../Homepage/Homeheader/Homeheader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
import { editUser } from "../../../store/actions/AppAction";
import { withRouter } from "react-router-dom";
import { logOutSuccess } from "../../../store/actions/AppAction";
import ChangePassword from "../ChangePassword/ChangePassword";
import "./EditUser.scss";
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      // password: "",
      username: "",
      address: "",
      phoneNumber: "",
      fullname: "",
      accessToken: "",
      id: "",
      isOpenModal: false,
      img: " ",
    };
  }
  componentDidMount() {
    this.setState({
      email: this.props.userInfor.user.email,
      // password: this.props.userInfor.user.password,
      username: this.props.userInfor.user.username,
      address: this.props.userInfor.user.address,
      phoneNumber: this.props.userInfor.user.phonenumber,
      fullname: this.props.userInfor.user.fullname,
      id: this.props.userInfor.user._id,
      img: this.props.userInfor.user.base64Img
        ? this.props.userInfor.user.base64Img
        : " ",
    });
  }
  componentDidUpdate(preProps, preState) {}
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEdituser = async () => {
    let data = {
      id: this.props.userInfor.user._id,
      address: this.state.address,
      phonenumber: this.state.phoneNumber,
      fullname: this.state.fullname,
      // accessToken: this.state.accessToken,
    };
    this.props.editUser(data);
    this.props.history.push("/");
  };
  handleEditPassworduser = () => {
    this.setState({ isOpenModal: true });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  handleLogout = () => {
    this.props.logOutSuccess();
  };
  handleGoAdmin = () => {
    this.props.history.push("/admin");
  };
  render() {
    return (
      <div className="container-fluid">
        <section className="homepage-header-container">
          <Homeheader />
        </section>
        <div className="edituser-container row mt-3">
          <div className="user-avt">
            {this.state.img === " " ? (
              <div className="user-avt-img"></div>
            ) : (
              <div
                className="user-avt-img"
                style={{
                  backgroundImage: `url(${this.state.img})`,
                  backgroundRepeat: "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            )}

            <span className="user-name">{this.state.fullname}</span>
            <span className="user-email">{this.state.email}</span>
          </div>

          <div className="edituser-content">
            <div className="form-group col-12">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "username");
                }}
                value={this.state.username}
                readOnly
              />
            </div>
            <div className="form-group col-12 mt-2">
              <label>Email </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="form-group mt-2 col-12">
              <label>Fullname</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your fullname"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "fullname");
                }}
                value={this.state.fullname}
              />
            </div>
            <div className="form-group mt-2 col-12">
              <label>Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your address"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="form-group col-12 mt-2">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Phone Number"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "phoneNumber");
                }}
                value={this.state.phoneNumber}
              />
            </div>
            <button
              className="btn btn-primary mt-2 mb-2"
              onClick={() => this.handleEdituser()}
            >
              Lưu thay đổi
            </button>
          </div>

          <div className="edituser-action">
            <span
              onClick={() => this.handleEditPassworduser()}
              className="action"
            >
              <span>Đổi mật khẩu</span>
              <i className="fas fa-key"></i>
            </span>
            <span className="action" onClick={() => this.handleLogout()}>
              <span>Đăng xuất</span>
              <i className="fas fa-sign-out"></i>
            </span>
            {this.props.userInfor &&
              this.props.userInfor.user &&
              this.props.userInfor.user.role === "admin" && (
                <span className="action" onClick={() => this.handleGoAdmin()}>
                  Go Admin
                </span>
              )}
          </div>
        </div>
        <ChangePassword
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleFromParent}
          userId={this.state.id}
        />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLogin: state.user.isLogin, userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (data) => dispatch(editUser(data)),
    logOutSuccess: () => dispatch(logOutSuccess()),
    // getUserInfor: () => dispatch(getUserInfor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditUser)
);
