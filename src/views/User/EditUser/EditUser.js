import React, { Component } from "react";
import { connect } from "react-redux";
import Homeheader from "../../Homepage/Homeheader/Homeheader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
import { editUser } from "../../../store/actions/AppAction";
import { withRouter } from "react-router-dom";
import { logOutSuccess } from "../../../store/actions/AppAction";
import avatar from "../../../assets/images/defaultAvatar.jpg";
import "./EditUser.scss";
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      address: "",
      phoneNumber: "",
      fullname: "",
      accessToken: "",
      id: "",
      img: " ",
    };
  }
  componentDidMount() {
    this.setState({
      email: this.props.userInfor.user.email,
      username: this.props.userInfor.user.username,
      address: this.props.userInfor.user.address,
      phoneNumber: this.props.userInfor.user.phonenumber,
      fullname: this.props.userInfor.user.fullname,
      id: this.props.userInfor.user._id,
      img: this.props.userInfor.user.img ? this.props.userInfor.user.img : " ",
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
    };
    this.props.editUser(data);
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="container">
        <section className="homepage-header-container">
          <Homeheader />
        </section>
        <div className="edituser-container row mt-3">
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src={this.state.img === " " ? avatar : this.state.img}
                    alt="Avatar"
                  />
                  <span className="font-weight-bold">
                    {this.state.fullname}
                  </span>
                  <span className="text-black-50">{this.state.email}</span>
                  <span> </span>
                </div>
              </div>
              <div className="col-md-5 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Hồ sơ người dùng</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Họ và tên</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="first name"
                        value={this.state.fullname}
                        onChange={(event) => {
                          this.handleOnchangeInput(event, "fullname");
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập số điện thoại"
                        value={this.state.phoneNumber}
                        onChange={(event) => {
                          this.handleOnchangeInput(event, "phoneNumber");
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Địa chỉ</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập địa chỉ"
                        value={this.state.address}
                        onChange={(event) => {
                          this.handleOnchangeInput(event, "address");
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="labels">Khu vực</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập khu vực"
                        defaultValue={"Việt Nam"}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập email"
                        value={this.state.email}
                        onChange={(event) => {
                          this.handleOnchangeInput(event, "email");
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-primary profile-button"
                      type="button"
                      onClick={() => this.handleEdituser()}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center experience">
                    <span>Thông tin thêm</span>
                    <span className="border px-3 p-1 add-experience">
                      <i className="fa fa-plus"></i>&nbsp;Thông tin thêm
                    </span>
                  </div>
                  <br />
                  <div className="col-md-12">
                    <label className="labels">Loại khách hàng</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="experience"
                      defaultValue={"Khách hàng VIP"}
                      readOnly
                    />
                  </div>{" "}
                  <br />
                  <div className="col-md-12">
                    <label className="labels">Chi tiết</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="additional details"
                      defaultValue={"Là khách hàng"}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditUser)
);
