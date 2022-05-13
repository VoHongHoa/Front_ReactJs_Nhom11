import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homeheader.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { logOutSuccess, searchProduct } from "../../../store/actions/AppAction";
import defaultAvatar from "../../../assets/images/default.png";
import { Link } from "react-router-dom";
class Homeheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCart: false,
      isOpenModal: false,
      userInfor: "",
      isLogin: "",
      keyword: "",
    };
  }
  componentDidMount() {
    this.setState({
      userInfor: this.props.userInfor,
      isLogin: this.props.isLogin,
    });
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
  handleOnChangeInput = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };
  getProductSearch = (keyword) => {
    this.props.searchProduct(keyword);
    this.props.history.push("/search");
  };
  render() {
    let { userInfor, isLogin } = this.props;
    let numOfitem = this.props.numOfItemInCart;

    return (
      <div className="header-container">
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
          <a href="#" className="navbar-brand">
            <i className="fa fa-cube"></i>UIT<b>Phone</b>
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            id="navbarCollapse"
            className="collapse navbar-collapse justify-content-start"
          >
            <div className="navbar-nav">
              <NavLink
                to="/"
                className="nav-item nav-link"
                activeClassName="active"
                exact={true}
              >
                Home
              </NavLink>
              <a href="#" className="nav-item nav-link">
                About
              </a>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Smartphone
                </a>
                <div className="dropdown-menu">
                  <NavLink
                    to="/products/samsum"
                    className="dropdown-item"
                    activeClassName="active"
                    exact={true}
                  >
                    SamSum
                  </NavLink>
                  <NavLink
                    to="/products/iphone"
                    className="dropdown-item"
                    activeClassName="active"
                    exact={true}
                  >
                    Iphone
                  </NavLink>
                  <NavLink
                    to="/products/oppo"
                    className="dropdown-item"
                    activeClassName="active"
                    exact={true}
                  >
                    Oppo
                  </NavLink>
                </div>
              </div>
              <a href="#" className="nav-item nav-link">
                Blog
              </a>
              <a href="#" className="nav-item nav-link">
                Contact
              </a>
            </div>
            <form className="navbar-form form-inline">
              <div className="input-group search-box">
                <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Search by Name"
                  onChange={(event) => this.handleOnChangeInput(event)}
                />
                <span className="input-group-addon">
                  <i
                    className="material-icons"
                    onClick={() => this.getProductSearch(this.state.keyword)}
                    style={{ cursor: "pointer" }}
                  >
                    &#xE8B6;
                  </i>
                </span>
              </div>
            </form>
            <div className="navbar-nav ml-auto">
              <a href="#" className="nav-item nav-link notifications">
                <i className="fa fa-bell-o"></i>
                <span className="badge">1</span>
              </a>

              <Link to="/cart" className="nav-item nav-link messages" exact>
                <i className="fas fa-shopping-cart"></i>
                <span className="badge">{numOfitem}</span>
              </Link>
              {isLogin && isLogin === true ? (
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    data-toggle="dropdown"
                    className="nav-link dropdown-toggle user-action"
                  >
                    <img
                      src={
                        userInfor.user.base64Img
                          ? userInfor.user.base64Img
                          : defaultAvatar
                      }
                      className="avatar"
                      alt="Avatar"
                    />{" "}
                    {userInfor.user.fullname}
                    <b className="caret"></b>
                  </a>
                  <div className="dropdown-menu">
                    <NavLink
                      to={`/user/${userInfor.user._id}`}
                      className="dropdown-item"
                      activeClassName="active"
                      exact={true}
                    >
                      <i className="fa fa-user-o"></i> Profile
                    </NavLink>

                    <a href="#" className="dropdown-item">
                      <i className="fa fa-calendar-o"></i> Calendar
                    </a>
                    <a href="#" className="dropdown-item">
                      <i className="fa fa-sliders"></i> Settings
                    </a>
                    <NavLink
                      to="/admin"
                      className="dropdown-item"
                      activeClassName="active"
                      exact={true}
                    >
                      <i className="fa fa-user-o"></i> Go Admin
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <p
                      className="dropdown-item"
                      onClick={() => this.handleLogout()}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="material-icons">&#xE8AC;</i> Logout
                    </p>
                  </div>
                </div>
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
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    numOfItemInCart: state.cart.cart.length,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOutSuccess: () => dispatch(logOutSuccess()),
    searchProduct: (keyword) => dispatch(searchProduct(keyword)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homeheader)
);
