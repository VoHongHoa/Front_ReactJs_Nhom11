import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../Adminheader/AdminHeader";
import {
  addNewProduct,
  getAllProduct,
  deleteProduct,
  editProduct,
  findProduct,
} from "../../../services/ProductService";
import ModalProduct from "./ModalProduct";
import "./ProductManage.scss";
import { toast } from "react-toastify";
import ModalEditProduct from "./ModalEditProduct";
import "./ProductManage.scss";
import Homeheader from "../../Homepage/Homeheader/Homeheader";
import HomeFooter from "../../Homepage/HomeFooter/HomeFooter";
class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      allProducts: [],
      currentProduct: {},
      isOpenModalEdit: false,
      keywordFind: "",
      currentPage: 0,
      numOfpage: 0,
      action: "",
    };
  }
  getAllProduct = async (currentPage) => {
    let res = await getAllProduct(currentPage);
    if (res && res.errCode === 1) {
      this.setState({
        allProducts: res.products,
        numOfpage: res.sumOfPage,
      });
    }
  };
  handleChangePage = async (currentPage) => {
    this.setState({
      currentPage: currentPage,
    });
    this.getAllProduct(currentPage);
  };
  handleChangeNextPage = async () => {
    let currentPage = this.state.currentPage + 1;
    this.setState({
      currentPage: currentPage,
    });
    this.getAllProduct(currentPage);
  };
  handleChangePrePage = async () => {
    let currentPage = this.state.currentPage - 1;
    this.setState({
      currentPage: currentPage,
    });
    this.getAllProduct(currentPage);
  };
  async componentDidMount() {
    this.getAllProduct(this.state.currentPage);
  }
  handleAddNewProduct = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  toggleFromParentEdit = () => {
    this.setState({
      isOpenModalEdit: false,
    });
  };
  doAddNewProduct = async (data) => {
    try {
      let res = await addNewProduct(data);
      if (res && res.errCode === 1) {
        toast.success(res.message);
        this.getAllProduct();
        this.setState({
          isOpenModal: false,
        });
      } else {
        toast.error("Thêm không thành công");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteProduct = async (product) => {
    try {
      if (product && product._id) {
        let res = await deleteProduct(product._id);
        console.log(res);
        if (res && res.errCode === 1) {
          toast.success(res.message);
          this.getAllProduct();
        } else {
          toast.error("Xóa không thành công");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditProduct = async (product) => {
    this.setState({
      isOpenModalEdit: true,
      currentProduct: product,
    });
    try {
      let res = await editProduct(product);
      if (res && res.errCode === 1) {
        this.getAllProduct();
        this.setState({
          isOpenModalEdit: false,
        });
        toast.success(res.message);
      } else {
        toast.error("Cập nhập không thành công");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleOnchangeInput = (event) => {
    this.setState({
      keywordFind: event.target.value,
    });
    this.handleSearchProduct(event.target.value);
  };
  handleSearchProduct = async (keyword) => {
    try {
      let res = await findProduct(keyword);
      // console.log("check res:", res);
      if (res && res.errCode === 1) {
        this.setState({
          allProducts: res.product,
          action: "SEARCH_USER",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let { allProducts, numOfpage, currentPage } = this.state;
    let arr = [];
    for (var i = 0; i < numOfpage; i++) {
      arr.push(i);
    }
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
            <div className="top-product-manage row mt-3">
              <span className="text-manage col-6">Quản lý sản phẩm</span>
              <div className="col-6 search-container">
                <input
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm...."
                  onChange={(event) => this.handleOnchangeInput(event)}
                />
                <button
                  type="submit"
                  className="btn-submit"
                  onClick={() =>
                    this.handleSearchProduct(this.state.keywordFind)
                  }
                >
                  <i className="fa fa-search fa-2x"></i>
                </button>
              </div>
            </div>
            <div className="product-container mt-3">
              <div className="button-add mb-3">
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleAddNewProduct()}
                >
                  Thêm mới
                </button>
              </div>
              <table className="customers">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Màu</th>
                    <th>Ram</th>
                    <th>Rom</th>
                    <th>Giá</th>
                    <th>Ảnh</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts &&
                    allProducts.length > 0 &&
                    allProducts.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{item.title}</td>
                          <td>{item.color}</td>
                          <td>{item.ram}</td>
                          <td>{item.rom}</td>
                          <td>{item.price}</td>
                          <td>
                            <div
                              className="img-product"
                              style={{
                                backgroundImage: `url(${item.img})`,
                                backgroundRepeat: "none",
                                backgroundSize: "cover",
                                width: "50px",
                                height: "50px",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          </td>
                          <td className="action-edit-del-product">
                            <i
                              className="fas fa-edit fa-2x"
                              onClick={() => this.handleEditProduct(item)}
                            ></i>
                            <i
                              className="fas fa-trash fa-2x"
                              onClick={() => this.handleDeleteProduct(item)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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

        <ModalProduct
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleFromParent}
          doAddNewProduct={this.doAddNewProduct}
        />
        <ModalEditProduct
          isOpen={this.state.isOpenModalEdit}
          toggleFromParent={this.toggleFromParentEdit}
          handleEditProduct={this.handleEditProduct}
          currentProduct={this.state.currentProduct}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductManage)
);
