import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import { findProduct } from "../../services/ProductService";
import { addToCart } from "../../store/actions/AppAction";
import "./DetailProduct.scss";

class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }
  async componentDidMount() {
    let name = this.props.match.params.id;
    let res = await findProduct(name);
    this.setState({
      product: res && res.product ? res.product[0] : {},
    });
    console.log("Check product: ", this.state.product);
  }
  handleAddToCart = product => {
    this.props.addToCart(product);
  };
  render() {
    let product = this.state.product;
    let isEmptyObj = Object.keys(product).length === 0;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Homeheader />
          <section id="sidebar">
            <p>
              Home | SamSum | <b>{product.title}</b>
            </p>
          </section>
          <h2>{product.title}</h2>
          <div className="container-detail">
            {isEmptyObj === false ? (
              <>
                <div>
                  <img className="img-detail" src={product.base64Img} />
                </div>
                <div className="info-detail">
                  <div>
                    <b>{product.price}</b> | Giá đã bao gồm 10% VAT
                  </div>
                  <div>Miễn phí vận chuyển toàn quốc</div>
                  <div>Màu: {product.color}</div>
                  <div>
                    <b>Khuyến mãi: </b> <br />
                    <p>
                      Tặng sim data HeraPlus ưu đãi 6GB/ngày (Chưa bao gồm tháng
                      đầu tiên) <br />- Áp dụng khi mua hàng online
                    </p>
                  </div>
                  <div className="detail-body-detail">
                    <h3>Thông số kỹ thuật</h3>
                    <p>Tên sản phẩm: {product.title}</p>
                    <p>Hãng: {product.categories}</p>
                    <p>Màu sắc: {product.color}</p>
                    <p>Ram: {product.ram}</p>
                    <p>Rom: {product.rom}</p>
                    <p>Nổi bật: {product.desc}</p>
                  </div>
                  <p>
                    <button onClick={() => this.handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <div>This product is no longer available</div>
            )}
          </div>
          <HomeFooter />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(DetailProduct);
