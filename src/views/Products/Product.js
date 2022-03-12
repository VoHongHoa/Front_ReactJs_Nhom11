import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import img from "../../assets/images/iphone13.jpg";
import { addToCart } from "../../store/actions/AppAction";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import "./Products.scss";
class Products extends Component {
  //   returnToHome = () => {
  //     this.props.history.push(path.HOMEPAGE);
  //   };
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleAddToCart = (item) => {
    console.log("check item add to cart:", item);
    this.props.addToCart(item);
  };
  render() {
    const items = [
      {
        id: "1",
        name: "Tailored Jeans",
        price: "30",
        des: " Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.",
      },
      // {
      //   id: "2",
      //   name: "Tailored Jeans",
      //   price: "20",
      //   des: " Some text about the jeans.",
      // },
      // {
      //   id: "3",
      //   name: "Tailored Jeans",
      //   price: "100",
      //   des: " Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum.",
      // },
    ];
    return (
      <React.Fragment>
        <section className="homepage-header-container">
          <Homeheader />
        </section>
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            return (
              <div className="card" key={item.id}>
                <img src={img} alt="product" />
                <h1>{item.name}</h1>
                <p className="price">{item.price}</p>
                <p>{item.des}</p>
                <p>
                  <button onClick={() => this.handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </p>
              </div>
            );
          })}
        <HomeFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Products)
);
