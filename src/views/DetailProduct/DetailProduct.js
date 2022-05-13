import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { getProductById } from "../../services/ProductService";
import { connect } from "react-redux";
// import { addToCart } from "../../store/actions/AppAction";
import "./DetailProduct.scss";
import { toast } from "react-toastify";
import { addReviews, getAllReviewProduct } from "../../services/ReviewService";

class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      newReview: "",
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    let res = await getProductById(id);
    this.getAllReviews(id);
    console.log("check res: ", res);
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
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  handleOnchangeInput = (event) => {
    this.setState({
      newReview: event.target.value,
    });
  };
  handleAddNewReview = async () => {
    try {
      let data = {
        review: this.state.newReview,
        userId: this.props.userInfor.user._id,
        productId: this.state.product._id,
      };
      let res = await addReviews(data);
      console.log(res);
      if (res && res.success === true) {
        toast.success("Thêm bình luận thành công!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Thêm bình luận không thành công");
    }
  };
  render() {
    let product = this.state.product;
    let isEmptyObj = Object.keys(product).length === 0;
    //console.log(this.state);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Homeheader />
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
              {/* <input  className="form-control"/> */}
              <textarea
                className="form-control"
                onChange={(event) => this.handleOnchangeInput(event)}
              ></textarea>
            </div>
            <button
              className="btn btn-primary mb-2 mt-2"
              onClick={() => this.handleAddNewReview()}
            >
              Thêm bình luận
            </button>
            <div className="detail-comment">
              <h5>Võ Hồng Hòa</h5>
              <p>Sản phẩm tốt</p>
            </div>
            <div className="detail-comment">
              <h5>Võ Hồng Hòa</h5>
              <p>Sản phẩm không tốt</p>
            </div>
          </div>
          <HomeFooter />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
);
