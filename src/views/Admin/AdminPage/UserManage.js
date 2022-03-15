import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../Adminheader/AdminHeader";
import { getAlluser } from "../../../services/UserService";
import "./UserManage.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alluser: [],
    };
  }
  async componentDidMount() {
    let respone = await getAlluser();
    if (respone && respone.success === true && respone.users) {
      this.setState({
        alluser: respone.users,
      });
    }
    console.log("check respone", respone);
  }
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
                        <i class="fas fa-edit"></i>
                        <i className="fas fa-trash"></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
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
