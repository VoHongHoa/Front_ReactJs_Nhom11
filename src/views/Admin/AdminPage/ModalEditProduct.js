import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import CommonUtils from "../../../utils/CommonUtils";
import "./ModalEditProduct.scss";
class ModalEditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tittle: "",
      desc: "",
      img: "",
      categories: "",
      color: "",
      price: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(preProps) {
    if (preProps.currentProduct !== this.props.currentProduct) {
      this.setState({
        id: this.props.currentProduct._id,
        tittle: this.props.currentProduct.title,
        desc: this.props.currentProduct.desc,
        img: this.props.currentProduct.base64Img,
        categories: {
          value: this.props.currentProduct.categories,
          label: this.props.currentProduct.categories,
        },
        color: {
          value: this.props.currentProduct.color,
          label: this.props.currentProduct.color,
        },
        price: this.props.currentProduct.price,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeSelect = (selectedOption, id) => {
    let name = id.name;
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeImage = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //console.log(base64);
      //let objectUrl = URL.createObjectURL(file);
      this.setState({
        //priviewImgURL: objectUrl,
        img: base64,
      });
    }
  };
  handleSubmitSave = () => {
    this.props.handleEditProduct({
      id: this.state.id,
      title: this.state.tittle,
      desc: this.state.desc,
      img: this.state.img,
      categories: this.state.categories.value,
      color: this.state.color.value,
      price: this.state.price,
    });
  };

  render() {
    const optionsColor = [
      { value: "Đen", label: "Đen" },
      { value: "Đỏ", label: "Đỏ" },
      { value: "vàng", label: "Vàng" },
      { value: "Bạch kim ", label: "Bạch kim" },
      { value: "Xanh ngọc", label: "Xanh ngọc" },
      { value: "Tím", label: "Tím" },
    ];

    const optionsCategories = [
      { value: "SamSum", label: "SamSum" },
      { value: "Iphone", label: "Iphone" },
      { value: "Oppo", label: "Oppo" },
      { value: "Sony", label: "Sony" },
    ];
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-product-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit sản phẩm
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-product-container row">
            <div className="form-group mt-2 col-6">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "tittle");
                }}
                value={this.state.tittle}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Mô tả</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product descriptions"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "desc");
                }}
                value={this.state.desc}
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label>Loại sản phẩm</label>
              <Select
                options={optionsCategories}
                value={this.state.categories}
                onChange={this.handleOnchangeSelect}
                name={"categories"}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Màu</label>
              <Select
                options={optionsColor}
                value={this.state.color}
                onChange={this.handleOnchangeSelect}
                name={"color"}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Giá</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product price"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "price");
                }}
                value={this.state.price}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Hình ảnh</label>
              <input
                type="file"
                className="form-control "
                onChange={(event) => {
                  this.handleOnchangeImage(event);
                }}
              />
              <div
                style={{
                  backgroundImage: `url(${this.state.img})`,
                  backgroundRepeat: "none",
                  backgroundSize: "cover",
                  width: "80px",
                  height: "100px",
                }}
              ></div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSubmitSave()}
          >
            Lưu thay đổi
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProduct);
