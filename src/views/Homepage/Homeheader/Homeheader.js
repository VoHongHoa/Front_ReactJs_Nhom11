import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homeheader.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import ModalCart from "./ModalCart/ModalCart";
import { logOutSuccess } from "../../../store/actions/AppAction";
// import _ from "lodash";
class Homeheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCart: false,
      isOpenModal: false,
      userInfor: "",
      isLogin: "",
    };
  }
  componentDidMount() {
    this.setState({
      userInfor: this.props.userInfor,
      isLogin: this.props.isLogin,
    });
  }
  componentDidUpdate(preProps) {
    if (this.state.userInfor !== this.props.userInfor) {
      this.setState({
        userInfor: this.props.userInfor,
        isLogin: this.props.isLogin,
      });
    }
  }
  handleIsOpenCart = () => {
    this.setState({
      isOpenCart: true,
    });
  };
  handleCloseCart = () => {
    this.setState({
      isOpenCart: false,
    });
  };
  handleOpenLogin = () => {
    this.props.history.push("/login");
  };
  handleLogout = () => {
    this.props.logOutSuccess();
  };
  returnToHome = () => {
    this.props.history.push("/");
  };
  handleOpenEditUser = (id) => {
    this.props.history.push(`/user/${id}`);
  };
  render() {
    let { userInfor, isLogin } = this.state;
    return (
      <React.Fragment>
        <div className="header-container container-fluid">
          <div className="top-header row">
            <div
              className="col-3 logo-container"
              onClick={() => this.returnToHome()}
            >
              <i className="fab fa-phoenix-squadron fa-3x"></i>
              <span>UITPHONE</span>
            </div>
            <div className="col-6 search-container">
              <input className="form-control" placeholder="Search..." />
              <button type="submit" className="btn-submit">
                <i className="fa fa-search fa-2x"></i>
              </button>
            </div>
            <div className="col-3 log-in">
              <div className="btn-log-in">
                {/* <i className="fas fa-sign-in fa-2x"></i> */}
                {isLogin && isLogin === true ? (
                  <>
                    {userInfor && userInfor.user && (
                      <div
                        className="user-infor"
                        onClick={() =>
                          this.handleOpenEditUser(userInfor.user._id)
                        }
                      >
                        <div className="user-avatar">
                          {!userInfor.user.img ? (
                            <i className="fa-solid fa-user"></i>
                          ) : (
                            " "
                          )}
                        </div>
                        <span>{userInfor.user.fullname}</span>
                        <div className="user-action">
                          <div className="more-action">
                            <i className="fas fa-angle-down"></i>
                          </div>
                        </div>
                      </div>
                    )}

                    <i
                      className="fas fa-sign-out"
                      onClick={() => this.handleLogout()}
                    ></i>
                  </>
                ) : (
                  <button
                    className="btn btn-light"
                    onClick={() => this.handleOpenLogin()}
                  >
                    Đăng nhập
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="bottom-header ">
            <div className="navbar">
              <NavLink to="/" activeClassName="active" exact={true}>
                Home
              </NavLink>
              <NavLink to="/product" activeClassName="active" exact={true}>
                Sam Sum
              </NavLink>
              <button
                type="button"
                className="btn-cart"
                onClick={() => this.handleIsOpenCart()}
              >
                <i className="fas fa-cart-plus fa-2x"></i>
              </button>
            </div>
          </div>
        </div>

        <ModalCart
          isOpen={this.state.isOpenCart}
          toggleFromParent={this.handleCloseCart}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userInfor: state.userInfor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOutSuccess: () => dispatch(logOutSuccess()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homeheader)
);
