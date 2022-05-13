import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homeheader.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import ModalCart from "./ModalCart/ModalCart";
import { logOutSuccess, searchProduct } from "../../../store/actions/AppAction";
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

  // // Things to do before unloading/closing the tab
  // doSomethingBeforeUnload = () => {
  //   this.props.logOutSuccess();
  // };

  // // Setup the `beforeunload` event listener
  // setupBeforeUnloadListener = () => {
  //   window.addEventListener("beforeunload", (ev) => {
  //     ev.preventDefault();
  //     return this.doSomethingBeforeUnload();
  //   });
  // };
  componentDidMount() {
    this.setState({
      userInfor: this.props.userInfor,
      isLogin: this.props.isLogin,
    });
    // this.setupBeforeUnloadListener();
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
                activeclassName="active"
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
                    activeclassName="active"
                    exact={true}
                  >
                    SamSum
                  </NavLink>
                  <NavLink
                    to="/products/iphone"
                    className="dropdown-item"
                    activeclassName="active"
                    exact={true}
                  >
                    Iphone
                  </NavLink>
                  <NavLink
                    to="/products/oppo"
                    className="dropdown-item"
                    activeclassName="active"
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
              <a href="#" className="nav-item nav-link messages">
                <i className="fa fa-envelope-o"></i>
                <span className="badge">10</span>
              </a>
              {isLogin && isLogin === true ? (
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    data-toggle="dropdown"
                    className="nav-link dropdown-toggle user-action"
                  >
                    <img
                      src={userInfor.user.base64Img}
                      className="avatar"
                      alt="Avatar"
                    />{" "}
                    {userInfor.user.fullname}
                    <b className="caret"></b>
                  </a>
                  <div className="dropdown-menu">
                    {/* <a
                      href="#"
                      className="dropdown-item"
                      onClick={() =>
                        this.handleOpenEditUser(userInfor.user._id)
                      }
                    >
                      <i className="fa fa-user-o"></i> Profile
                    </a> */}

                    <NavLink
                      to={`/user/${userInfor.user._id}`}
                      className="dropdown-item"
                      activeclassName="active"
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
                      activeclassName="active"
                      exact={true}
                    >
                      <i className="fa fa-user-o"></i> Go Admin
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => this.handleLogout()}
                    >
                      <i className="material-icons">&#xE8AC;</i> Logout
                    </a>
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

      // <React.Fragment>
      //   <div className="header-container container-fluid">
      //     <div className="top-header row">
      //       <div
      //         className="col-3 logo-container"
      //         onClick={() => this.returnToHome()}
      //       >
      //         <i className="fab fa-phoenix-squadron fa-3x"></i>
      //         <span>UITPHONE</span>
      //       </div>
      //       <div className="col-6 search-container">
      //         <input
      //           className="form-control"
      //           placeholder="Search..."
      //           onChange={(event) => this.handleOnChangeInput(event)}
      //         />
      //         <button type="submit" className="btn-submit">
      //           <i
      //             className="fa fa-search fa-2x"
      //             onClick={() => this.getProductSearch(this.state.keyword)}
      //           ></i>
      //         </button>
      //       </div>
      //       <div className="col-3 log-in">
      //         <div className="btn-log-in">
      //           {/* <i className="fas fa-sign-in fa-2x"></i> */}
      //           {isLogin && isLogin === true ? (
      //             <>
      //               {userInfor && userInfor.user && (
      //                 <div
      //                   className="user-infor"
      //                   onClick={() =>
      //                     this.handleOpenEditUser(userInfor.user._id)
      //                   }
      //                 >
      //                   {!userInfor.user.base64Img ? (
      //                     <div className="user-avatar">
      //                       <i className="fa-solid fa-user"></i>
      //                     </div>
      //                   ) : (
      //                     <div
      //                       className="user-avatar"
      //                       style={{
      //                         backgroundImage: `url(${userInfor.user.base64Img})`,
      //                         backgroundRepeat: "none",
      //                         backgroundSize: "cover",
      //                         backgroundPosition: "center",
      //                       }}
      //                     ></div>
      //                   )}

      //                   <span>{userInfor.user.fullname}</span>
      //                   <div className="user-action">
      //                     <div className="more-action">
      //                       <i className="fas fa-angle-down"></i>
      //                     </div>
      //                   </div>
      //                 </div>
      //               )}

      //               <i
      //                 className="fas fa-sign-out"
      //                 onClick={() => this.handleLogout()}
      //               ></i>
      //             </>
      //           ) : (
      //             <button
      //               className="btn btn-light"
      //               onClick={() => this.handleOpenLogin()}
      //             >
      //               Đăng nhập
      //             </button>
      //           )}
      //         </div>
      //       </div>
      //     </div>
      //     <div className="bottom-header ">
      //       <div className="navbar">
      //         <NavLink to="/" activeclassName="active" exact={true}>
      //           Home
      //         </NavLink>
      //         <NavLink
      //           to="/products/samsum"
      //           activeclassName="active"
      //           exact={true}
      //         >
      //           SamSum
      //         </NavLink>
      //         <NavLink
      //           to="/products/iphone"
      //           activeclassName="active"
      //           exact={true}
      //         >
      //           Iphone
      //         </NavLink>
      //         <NavLink
      //           to="/products/oppo"
      //           activeclassName="active"
      //           exact={true}
      //         >
      //           Oppo
      //         </NavLink>
      //         <button
      //           type="button"
      //           className="btn-cart"
      //           onClick={() => this.handleIsOpenCart()}
      //         >
      //           <i className="fas fa-cart-plus fa-2x"></i>
      //         </button>
      //       </div>
      //     </div>
      //     <ModalCart
      //       isOpen={this.state.isOpenCart}
      //       toggleFromParent={this.handleCloseCart}
      //     />
      //   </div>
      // </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
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
