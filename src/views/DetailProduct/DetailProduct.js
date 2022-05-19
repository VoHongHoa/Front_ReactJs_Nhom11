import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { getProductById } from "../../services/ProductService";
import { connect } from "react-redux";
// import { addToCart } from "../../store/actions/AppAction";
import "./DetailProduct.scss";
import { toast } from "react-toastify";
import {
  addReviews,
  deleteReview,
  editReview,
  getAllReviewProduct,
} from "../../services/ReviewService";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";
import ModalEditReview from "./ModalEditReview";
class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      newReview: "",
      allReview: [],
      isShowComment: true,
      curentReview: {},
      isOpenModal: false,
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    let res = await getProductById(id);
    this.getAllReviews(id);
    //console.log("check res: ", res);
    if (res) {
      this.setState({
        product: res && res.product ? res.product : {},
      });
    }
  }
  handleAddToCart = (product) => {
    this.props.addToCart(product);
  };
  getAllReviews = async (productId) => {
    try {
      let res = await getAllReviewProduct(productId);
      this.setState({
        allReview: res,
      });
    } catch (e) {
      console.log(e);
    }
  };
  handleOnchangeInput = (event) => {
    this.setState({
      newReview: event.target.value,
    });
  };
  checkAddNewComment = () => {
    let isValid = true;
    if (this.props.isLogin === false) {
      toast.error("Vui lòng đăng nhập");
      isValid = false;
      return;
    }
    if (this.state.newReview === "") {
      toast.error("Vui lòng thêm nội dung bình luận!");
      isValid = false;
      return;
    }
    return isValid;
  };
  handleAddNewReview = async () => {
    try {
      if (this.checkAddNewComment()) {
        let data = {
          review: this.state.newReview,
          productId: this.state.product._id,
        };
        let res = await addReviews(data);
        //console.log(res);
        if (res && res.success === true) {
          this.setState({
            newReview: "",
          });
          toast.success("Thêm bình luận thành công!");
          this.getAllReviews(this.props.match.params.id);
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Thêm bình luận không thành công");
    }
  };
  handleShowComment = () => {
    this.setState({
      isShowComment: !this.state.isShowComment,
    });
  };
  handleDeleteReview = async (reviewId) => {
    try {
      let res = await deleteReview(reviewId);
      //console.log(res);
      if (res && res.success === true) {
        toast.success("Xóa bình luận thành công!");
        this.getAllReviews(this.props.match.params.id);
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  handleOpenModalEditReview = async (item) => {
    this.setState({
      curentReview: item,
      isOpenModal: true,
    });
  };
  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  doEditReview = async (data) => {
    try {
      let res = await editReview(data);
      //console.log(res);
      if (res && res.success === true) {
        toast.success("Chỉnh sửa thành công");
        this.getAllReviews(this.props.match.params.id);
        this.setState({
          isOpenModal: false,
        });
      } else {
        toast.error("Chỉnh sửa thất bại");
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  render() {
    let { product, allReview, isShowComment } = this.state;
    let isEmptyObj = Object.keys(product).length === 0;
    // console.log(allReview);
    return (
      <React.Fragment>
        <div className="container">
          <section className="homepage-header-container">
            <Homeheader />
          </section>
          <section id="sidebar">
            <p>
              Home | SamSum | <b>{product.title}</b>
            </p>
          </section>
          <div className="container-detail">
            <div className="card-product">
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <div className="row">
                  <div className="col-lg-5 col-md-5 col-sm-6">
                    <div className="white-box text-center">
                      <img src={product.base64Img} className="img-responsive" />
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-6">
                    <h2 className="mt-5">{product.price} VNĐ</h2>
                    <button
                      className="btn btn-dark btn-rounded mr-1"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Add to cart"
                    >
                      <i className="fa fa-shopping-cart"></i>
                    </button>
                    <button className="btn btn-primary btn-rounded">
                      Buy Now
                    </button>
                    <h3 className="box-title mt-5">Khuyến mãi</h3>
                    <ul className="list-unstyled">
                      <li>
                        <i className="fa fa-check text-success"></i>Sản phẩm
                        đang thuộc chương trình Flash sale (Số lượng có hạn)
                      </li>
                      <li>
                        <i className="fa fa-check text-success"></i>Giảm đến 30%
                        Gói bảo hành Samsung Care+ chỉ còn 2.780.000đ
                      </li>
                      <li>
                        <i className="fa fa-check text-success"></i>Tặng sim
                        data Mobifone Hera 5G (2.5GB/ngày)
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h3 className="box-title mt-5">Thông tin kỹ thuật</h3>
                    <div className="table-responsive">
                      <table className="table table-striped table-product">
                        <tbody>
                          <tr>
                            <td>Product name</td>
                            <td>{product.title}</td>
                          </tr>
                          <tr>
                            <td width="390">Brand</td>
                            <td>{product.categories}</td>
                          </tr>
                          <tr>
                            <td>Ram</td>
                            <td>{product.ram}</td>
                          </tr>
                          <tr>
                            <td>Rom</td>
                            <td>{product.rom}</td>
                          </tr>
                          <tr>
                            <td>Color</td>
                            <td>{product.color}</td>
                          </tr>
                          <tr>
                            <td>Outstanding features</td>
                            <td>{product.desc}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <h2>Bình luận</h2>
            <div className="form-groud">
              <label>Thêm bình luận</label>

              <textarea
                className="form-control"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.newReview}
              ></textarea>
            </div>
            <button
              className="btn btn-primary mb-2 mt-2"
              onClick={() => this.handleAddNewReview()}
            >
              Thêm bình luận
            </button>
          </div>

          <div className="container mt-5">
            <div className="row  d-flex justify-content-center">
              <div className="col-md-8">
                <div className="headings d-flex justify-content-between align-items-center mb-3">
                  <h5> {allReview.length} Comments</h5>

                  <div className="buttons">
                    <span className="badge bg-white d-flex flex-row align-items-center">
                      <span className="text-primary">
                        Comments {isShowComment === true ? "ON" : "OFF"}
                      </span>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked={this.state.isShowComment}
                          onChange={() => this.handleShowComment()}
                        />
                      </div>
                    </span>
                  </div>
                </div>
                {isShowComment === true && (
                  <div className="comments-view mb-3">
                    {allReview &&
                      allReview.length > 0 &&
                      allReview.map((item, index) => {
                        return (
                          <div className="card p-3 mt-2" key={item._id}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="user d-flex flex-row align-items-center">
                                <img
                                  src={
                                    item.user[0] && item.user[0].img
                                      ? item.user[0].img
                                      : defaultAvatar
                                  }
                                  width="30"
                                  className="user-img rounded-circle mr-2"
                                />
                                <span>
                                  <small className="font-weight-bold text-primary">
                                    {item.user[0] && item.user[0].fullname
                                      ? item.user[0].fullname
                                      : "Người dùng"}
                                  </small>{" "}
                                  <small className="font-weight-bold">
                                    {item.review}
                                  </small>
                                </span>
                              </div>

                              <small>{item.updatedAt}</small>
                            </div>

                            {this.props.userInfor.user &&
                              this.props.userInfor.user._id === item.userId && (
                                <div className="action d-flex justify-content-between mt-2 align-items-center">
                                  <div className="reply px-4">
                                    <small
                                      onClick={() =>
                                        this.handleDeleteReview(item._id)
                                      }
                                    >
                                      Remove
                                    </small>
                                    <span className="dots"></span>
                                    <small
                                      onClick={() =>
                                        this.handleOpenModalEditReview(item)
                                      }
                                    >
                                      Edit
                                    </small>
                                  </div>
                                  <div className="icons align-items-center">
                                    <i className="fa fa-check-circle-o check-icon text-primary"></i>
                                  </div>
                                </div>
                              )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <ModalEditReview
            isOpen={this.state.isOpenModal}
            toggleFromParent={this.toggleFromParent}
            review={this.state.curentReview}
            doEditReview={this.doEditReview}
          />
          <HomeFooter />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
);
