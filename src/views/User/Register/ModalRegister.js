import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handleRegisterUser } from "../../../services/UserService";
import { toast } from "react-toastify";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
class ModalRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      address: "",
      phoneNumber: "",
      fullname: "",
      img: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(preProps, preState) {}

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
  // handleOnchangeSelect = (selectedOption) => {
  //   this.setState({
  //     selectedOption: selectedOption,
  //   });
  // };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "fullname",
      "username",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      // console.log(this.state[arrInput[i]]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error(`Vui lòng điền thông tin ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };
  handleOnchangeImage = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    //console.log(file);
    if (file) {
      const storageRef = ref(storage, `/user/${file.name}`);
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
  handleRegisterUser = async () => {
    //console.log(this.state);

    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create modal
      let response = await handleRegisterUser({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        fullname: this.state.fullname,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        //gender: this.state.selectedOption.label,
        img: this.state.img,
      });
      //console.log("check respone", response);
      if (response && response.success === true) {
        toast.success(response.message);
        this.setState({
          email: "",
          password: "",
          username: "",
          address: "",
          phoneNumber: "",
          //selectedOption: "",
        });
        this.toggle();
      } else {
        toast.error(response.message);
      }
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Đăng kí người dùng
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-user-container row">
            <div className="form-group mt-2 col-6">
              <label>Tên Đăng nhập</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên đăng nhập"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "username");
                }}
                value={this.state.username}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "password");
                }}
                value={this.state.password}
              />
            </div>

            <div className="form-group col-6 mt-2">
              <label>Email </label>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Họ và tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập họ và tên"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "fullname");
                }}
                value={this.state.fullname}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập địa chỉ"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="form-group col-6 mt-2">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Phone Number"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "phoneNumber");
                }}
                value={this.state.phoneNumber}
              />
            </div>
            {/* <div className="form-group col-6 mt-2">
              <label>Giới tính</label>
              <Select
                value={selectedOption}
                onChange={this.handleOnchangeSelect}
                options={options}
              />
            </div> */}
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
            onClick={() => this.handleRegisterUser()}
          >
            Đăng kí
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalRegister);
