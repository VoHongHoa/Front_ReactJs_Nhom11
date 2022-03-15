import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import "./AdminHeader.scss";
class AdminHeader extends Component {
  componentDidMount() {}
  render() {
    let { userInfor } = this.props;
    return (
      <>
        <div className="admin-header-container">
          <div className="topnav">
            <div className="item-manage">
              <NavLink to="/admin/user" activeClassName="active" exact={true}>
                User
              </NavLink>
              <NavLink
                to="/admin/product"
                activeClassName="active"
                exact={true}
              >
                Product
              </NavLink>
            </div>

            <div className="admin-name">
              {userInfor && userInfor.user && userInfor.user.fullname && (
                <button className="btn btn-light">
                  Wel,{userInfor.user.fullname}{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminHeader)
);
