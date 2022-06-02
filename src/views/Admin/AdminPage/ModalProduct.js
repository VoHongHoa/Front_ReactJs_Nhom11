import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  optionsColor,
  optionsRam,
  optionsRom,
  optionsCategories,
} from "../../../utils/constants";
class ModalProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tittle: "",
      desc: "",
      img: "",
      categories: "",
      color: "",
      price: "",
      ram: "",
      rom: "",
    };
  }
  componentDidMount() {}
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
    //console.log(file);
    if (file) {
      const storageRef = ref(storage, `/products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("check url", url);
            this.setState({
              img: url,
            });
          });
        }
      );
    }
  };
  handleSubmitAdd = () => {
    this.props.doAddNewProduct({
      title: this.state.tittle,
      desc: this.state.desc,
      img: this.state.img,
      categories: this.state.categories.value,
      color: this.state.color.value,
      price: this.state.price,
      ram: this.state.ram.value,
      rom: this.state.rom.value,
    });
    this.setState({
      tittle: "",
      desc: "",
      img: "",
      categories: "",
      color: "",
      price: "",
      ram: "",
      rom: "",
    });
  };

  render() {
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
          Thêm mới sản phẩm
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
              <label>Ram</label>
              <Select
                options={optionsRam}
                value={this.state.ram}
                onChange={this.handleOnchangeSelect}
                name={"ram"}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Rom</label>
              <Select
                options={optionsRom}
                value={this.state.rom}
                onChange={this.handleOnchangeSelect}
                name={"rom"}
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
                className="form-control"
                onChange={(event) => {
                  this.handleOnchangeImage(event);
                }}
              />

              <div
                className="mt-2"
                style={{
                  backgroundImage: `url(${this.state.img})`,
                  backgroundRepeat: "none",
                  backgroundSize: "cover",
                  width: "80px",
                  height: "100px",
                  backgroundPosition: "center",
                  margin: "0 auto",
                  border: " 1px solid black",
                }}
              ></div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSubmitAdd()}
          >
            Thêm mới
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
