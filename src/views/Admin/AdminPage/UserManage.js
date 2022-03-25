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
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alluser: [],
      isOpenModal: false,
      currentUserEdit: {},
      name: "",
      numOfpage: "",
      currentPage: 0,
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
      name: event.target.value,
    });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  handleSearchUser = async (name) => {
    try {
      let res = await findUser(name);
      //console.log("check res:", res);
      if (res && res.errorCode === 1 && res.result) {
        toast.success(res.message);
        this.setState({
          alluser: res.result,
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
    console.log(res);
    if (res && res.success === true) {
      this.setState({
        alluser: res.users,
      });
    }
  };
  // handleChangeNextPage = async () => {
  //   this.setState({
  //     currentPage: this.state.currentPage++,
  //   });
  //   let res = await getAlluser(this.state.currentPage);
  //   console.log(res);
  //   if (res && res.success === true) {
  //     this.setState({
  //       alluser: res.users,
  //     });
  //   }
  // };
  render() {
    let { alluser, numOfpage, currentPage } = this.state;
    let arr = [];
    for (var i = 0; i < numOfpage; i++) {
      arr.push(i);
    }
    //console.log(arr);
    return (
      <div className="container-fluid">
        <AdminHeader />
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
              onClick={() => this.handleSearchUser(this.state.name)}
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
                <th>Address</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {alluser &&
                alluser.length > 0 &&
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
                })}
            </tbody>
          </table>
          <table></table>
          <div className="pagination">
            <span>&laquo;</span>
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

            <span>&raquo;</span>
          </div>
        </div>
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
