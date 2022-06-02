import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../Adminheader/AdminHeader";
import {
  getAlluser,
  deleteuser,
  editUserFromAdmin,
  findUser,
} from "../../../services/UserService";
import { toast } from "react-toastify";
import ModalEditUserAdmin from "./ModalEditUserAdmin";
import "./UserManage.scss";
import Homeheader from "../../Homepage/Homeheader/Homeheader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alluser: [],
      isOpenModal: false,
      currentUserEdit: {},
      keyword: "",
      numOfpage: "",
      currentPage: 0,
      action: "",
    };
  }
  async componentDidMount() {
    let respone = await getAlluser(this.state.currentPage);
    //console.log(respone);
    if (respone && respone.success === true && respone.users) {
      this.setState({
        alluser: respone.users,
        numOfpage: respone.sumOfPage,
      });
    }
    //console.log("check respone", respone);
  }
  handleDeleteUser = async (userId) => {
    let res = await deleteuser(userId);
    if (res && res.success === true) {
      toast.success("Xoá user thành công");
      let respone = await getAlluser();
      if (respone && respone.success === true && respone.users) {
        this.setState({
          alluser: respone.users,
          currentPage: 0,
        });
      }
    } else {
      toast.error("Xóa không thành công");
    }
  };
  doEditUser = async (data) => {
    try {
      let res = await editUserFromAdmin(data);
      if (res && res.success === true) {
        toast.success(res.message);
        this.setState({
          isOpenModal: false,
        });
        let respone = await getAlluser();
        if (respone && respone.success === true && respone.users) {
          this.setState({
            alluser: respone.users,
            currentPage: 0,
          });
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleOpenModalEdit = (item) => {
    this.setState({
      isOpenModal: true,
      currentUserEdit: item,
    });
  };
  handleOnchangeInput = (event) => {
    this.setState({
      keyword: event.target.value,
    });
    this.handleSearchUser(event.target.value);
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  handleSearchUser = async (keyWord) => {
    try {
      let res = await findUser(keyWord);
      //console.log("check res:", res);
      if (res && res.errorCode === 1 && res.result) {
        this.setState({
          alluser: res.result,
          action: "SEARCH_USER",
        });
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleChangePage = async (currentPage) => {
    this.setState({
      currentPage: currentPage,
    });
    let res = await getAlluser(currentPage);
    // console.log(res);
    if (res && res.success === true) {
      this.setState({
        alluser: res.users,
      });
    }
  };
  handleChangeNextPage = async () => {
    let currentPage = this.state.currentPage + 1;
    this.setState({
      currentPage: currentPage,
    });
    let res = await getAlluser(currentPage);
    //console.log(res);
    if (res && res.success === true) {
      this.setState({
        alluser: res.users,
      });
    }
  };
  handleChangePrePage = async () => {
    let currentPage = this.state.currentPage - 1;
    this.setState({
      currentPage: currentPage,
    });
    let res = await getAlluser(currentPage);
    //console.log(res);
    if (res && res.success === true) {
      this.setState({
        alluser: res.users,
      });
    }
  };
  render() {
    let { alluser, numOfpage, currentPage } = this.state;
    let arr = [];
    for (var i = 0; i < numOfpage; i++) {
      arr.push(i);
    }
    //console.log(arr);
    return (
      <div className="container">
        <section className="homepage-header-container">
          <Homeheader />
        </section>
        <div className="row mt-2 mb-2">
          <div className="left-content col-md-2 mt-2">
            <AdminHeader></AdminHeader>
          </div>

          <div className="right-content col-md-10">
            <div className="top-user-manage row mt-3">
              <span className="text-manage col-6">Quản lý người dùng</span>
              <div className="col-6 search-container">
                <input
                  className="form-control"
                  placeholder="Tìm kiếm người dùng theo tên, địa chỉ, quyền, ..."
                  onChange={(event) => this.handleOnchangeInput(event)}
                />
                <button
                  type="submit"
                  className="btn-submit"
                  onClick={() => this.handleSearchUser(this.state.keyword)}
                >
                  <i className="fa fa-search fa-2x"></i>
                </button>
              </div>
            </div>
            <div className="user-container mt-3">
              <table id="customers">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Vai trò</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {alluser && alluser.length > 0 ? (
                    alluser.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{item.fullname}</td>
                          <td>{item.email}</td>
                          <td>{item.address}</td>
                          <td>{item.role}</td>
                          <td className="action-edit-del">
                            <i
                              className="fas fa-edit fa-2x"
                              onClick={() => this.handleOpenModalEdit(item)}
                            ></i>
                            <i
                              className="fas fa-trash fa-2x"
                              onClick={() => this.handleDeleteUser(item._id)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <p className="title">Không có người dùng</p>
                  )}
                </tbody>
              </table>
              <table></table>
              {this.state.action !== "SEARCH_USER" ? (
                <div className="pagination">
                  {currentPage > 0 && (
                    <span onClick={() => this.handleChangePrePage()}>
                      &laquo;
                    </span>
                  )}

                  {arr &&
                    arr.length > 0 &&
                    arr.map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => this.handleChangePage(item)}
                          className={currentPage === item ? "active" : " "}
                        >
                          {item}
                        </span>
                      );
                    })}

                  {currentPage < numOfpage - 1 && (
                    <span onClick={() => this.handleChangeNextPage()}>
                      &raquo;
                    </span>
                  )}
                </div>
              ) : (
                " "
              )}
            </div>
          </div>
        </div>
        <HomeFooter />

        <ModalEditUserAdmin
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleFromParent}
          userEdit={this.state.currentUserEdit}
          doEditUser={this.doEditUser}
        />
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
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
