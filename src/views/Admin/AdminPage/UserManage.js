import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../Adminheader/AdminHeader";
import {
  getAlluser,
  deleteuser,
  editUserFromAdmin,
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
    };
  }
  async componentDidMount() {
    let respone = await getAlluser();
    if (respone && respone.success === true && respone.users) {
      this.setState({
        alluser: respone.users,
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
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  render() {
    let { alluser } = this.state;
    return (
      <>
        <AdminHeader />
        <span className="text-manage ">Quản lý người dùng</span>
        <div className="user-container mt-3">
          <table>
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
                          className="fas fa-edit"
                          onClick={() => this.handleOpenModalEdit(item)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={() => this.handleDeleteUser(item._id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <ModalEditUserAdmin
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleFromParent}
          userEdit={this.state.currentUserEdit}
          doEditUser={this.doEditUser}
        />
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
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
