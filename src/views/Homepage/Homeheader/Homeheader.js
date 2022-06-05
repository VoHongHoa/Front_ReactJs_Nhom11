import React, { Component } from "react";
import { connect } from "react-redux";
import "./Homeheader.scss";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import {
  getAllProducts,
  logOutSuccess,
  searchProduct,
} from "../../../store/actions/AppAction";
import defaultAvatar from "../../../assets/images/defaultAvatar.jpg";
import { Link } from "react-router-dom";
import ChangePassword from "../../User/ChangePassword/ChangePassword";
import Select from "react-select";
import { optionsCategories } from "../../../utils/constants";
class Homeheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfor: "",
      isLogin: "",
      keyword: "",
      isOpenModal: false,
      allProduct: [],
    };
  }
  async componentDidMount() {
    await this.props.getAllProduct();
    this.setState({
      userInfor: this.props.userInfor,
      isLogin: this.props.isLogin,
      // allProduct: this.props.allProduct,
    });
  }
  componentDidUpdate() {
    this.getDataSelect(this.props.allProduct);
  }
  getDataSelect = data => {
    //console.log("ceheck", this.props.allProduct);
    let optionSearch = [];
    if (optionsCategories.length > 0) {
      for (let i = 0; i < optionsCategories.length; i++) {
        let obj = {};
        obj.value = optionsCategories[i].value;
        obj.label = optionsCategories[i].label;
        optionSearch.push(obj);
      }
    }
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.value = data[i].title;
        obj.label = data[i].title;
        optionSearch.push(obj);
      }
    }

    return optionSearch;
  };
  handleOnchangeSelect = (selectedOption, id) => {
    let name = id.name;
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeSelect = selectedOption => {
    console.log(selectedOption);
    this.setState({
      keyword: selectedOption ? selectedOption.value : " ",
    });
    this.getProductSearch(selectedOption.value);
  };
  handleEditPassworduser = () => {
    this.setState({ isOpenModal: true });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
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
  handleOpenEditUser = id => {
    this.props.history.push(`/user/${id}`);
  };
  handleOnChangeInput = event => {
    this.setState({
      keyword: event.target.value,
    });
  };
  getProductSearch = keyword => {
    this.props.searchProduct(keyword);
    this.props.history.push("/search");
  };
  render() {
    let { userInfor, isLogin, allProduct } = this.props;
    let numOfitem = this.props.numOfItemInCart;
    let Option = this.getDataSelect(allProduct);

    return (
      <div className="header-container">
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
          {/* <a href="#" className="navbar-brand">
            
          </a> */}
          <Link to={"/"} className="navbar-brand" exact="true">
            <i className="fa fa-cube"></i>UIT<b>Phone</b>
          </Link>
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
                exact
              >
                Trang chủ
              </NavLink>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Điện thoại
                </a>
                <div className="dropdown-menu">
                  {optionsCategories &&
                    optionsCategories.length > 0 &&
                    optionsCategories.map((item, index) => {
                      return (
                        <NavLink
                          to={`/products/${item.value}`}
                          className="dropdown-item"
                          activeClassName="active"
                          exact
                          key={index}
                        >
                          {item.label}
                        </NavLink>
                      );
                    })}
                  {/* <NavLink
                    to="/products/SamSum"
                    className="dropdown-item"
                    activeClassName="active"
                    exact
                  >
                    SamSum
                  </NavLink>
                  <NavLink
                    to="/products/Iphone"
                    className="dropdown-item"
                    activeClassName="active"
                    exact
                  >
                    Iphone
                  </NavLink>
                  <NavLink
                    to="/products/Oppo"
                    className="dropdown-item"
                    activeClassName="active"
                    exact
                  >
                    Oppo
                  </NavLink> */}
                </div>
              </div>
              {/* <NavLink
                to={"/about-us"}
                className="nav-item nav-link"
                activeClassName="active"
                exact
              >
                Về chúng tôi
              </NavLink> */}

              {/* <a href="#" className="nav-item nav-link">
                Blog
              </a> */}
              <NavLink
                to={"/blog"}
                className="nav-item nav-link"
                activeClassName="active"
                exact
              >
                Blog
              </NavLink>
              <NavLink
                to={"/contact"}
                className="nav-item nav-link"
                activeClassName="active"
                exact="true"
              >
                Liên hệ
              </NavLink>
            </div>
            <form className="navbar-form form-inline">
              <div className="input-group search-box">
                {/* <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Search by Name"
                  onChange={(event) => this.handleOnChangeInput(event)}
                /> */}

                <Select
                  options={Option}
                  value={this.state.keyword}
                  onChange={this.handleOnchangeSelect}
                  name={"categories"}
                  placeholder="Tìm kiếm sản phẩm..."
                  width="100%"
                />

                {/* <span className="input-group-addon">
                  <i
                    className="material-icons"
                    onClick={() => this.getProductSearch(this.state.keyword)}
                    style={{ cursor: "pointer" }}
                  >
                    &#xE8B6;
                  </i>
                </span> */}
              </div>
            </form>
            <div className="navbar-nav ml-auto">
              {/* <a href="#" className="nav-item nav-link notifications">
                <i className="fa fa-bell-o"></i>
                <span className="badge">1</span>
              </a> */}

              <Link
                to="/cart"
                className="nav-item nav-link messages"
                exact="true"
              >
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
                        userInfor.user && userInfor.user.img
                          ? userInfor.user.img
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
                      exact
                    >
                      <i className="fa fa-user-o"></i> Hồ sơ người dùng
                    </NavLink>

                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => this.handleEditPassworduser()}
                    >
                      <i className="fa-solid fa-key"></i> Đổi mật khẩu
                    </a>
                    <NavLink
                      to="/cart"
                      className="dropdown-item"
                      activeClassName="active"
                      exact
                    >
                      <i className="fas fa-shopping-cart"></i> Giỏ hàng
                    </NavLink>

                    <NavLink
                      to="/user-orders"
                      className="dropdown-item"
                      activeClassName="active"
                      exact
                    >
                      <i className="fas fa-shopping-bag"></i> Đơn hàng
                    </NavLink>

                    {this.props.userInfor &&
                      this.props.userInfor.user &&
                      this.props.userInfor.user.role &&
                      this.props.userInfor.user.role === "admin" && (
                        <NavLink
                          to="/admin"
                          className="dropdown-item"
                          activeClassName="active"
                          exact
                        >
                          <i className="fas fa-tools"></i>Chuyển đến Admin
                        </NavLink>
                      )}
                    <div className="dropdown-divider"></div>
                    <p
                      className="dropdown-item"
                      onClick={() => this.handleLogout()}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="material-icons">&#xE8AC;</i> Đăng xuất
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
        {this.props.userInfor.user && this.props.userInfor.user._id && (
          <ChangePassword
            isOpen={this.state.isOpenModal}
            toggleFromParent={this.toggleFromParent}
            userId={this.props.userInfor.user._id}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    numOfItemInCart: state.cart.cart.length,
    allProduct: state.products.allProduct,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logOutSuccess: () => dispatch(logOutSuccess()),
    searchProduct: keyword => dispatch(searchProduct(keyword)),
    getAllProduct: () => dispatch(getAllProducts()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homeheader)
);
