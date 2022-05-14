import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { changePassword } from "../../../services/UserService";
import { logOutSuccess } from "../../../store/actions/AppAction";
import "./ChangePassword.scss";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      conformPassword: "",
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
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["oldPassword", "newPassword", "conformPassword"];
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
  handleChangePassword = async () => {
    if (this.checkValidateInput()) {
      if (this.state.newPassword !== this.state.conformPassword) {
        toast.error("Mật khẩu mới và mật khẩu xác nhận không khớp");
        return;
      } else {
        console.log(this.props.userId);
        let res = await changePassword({
          id: this.props.userId,
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
        });
        if (res && res.errCode === 0) {
          toast.success(`${res.message}! Vui lòng đăng nhập lại`);
          this.props.logOutSuccess();
        } else {
          toast.error(res.errMessage);
        }
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
        size="sm"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Thay đổi mật khẩu
        </ModalHeader>
        <ModalBody>
          <div className="change-password-background">
            <div className="container-center">
              <div className="logo">
                <i className="fab fa-phoenix-squadron fa-4x"></i>
              </div>
              <div className="content">
                <div>
                  <label>Nhập mật khẩu cũ</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "oldPassword")
                    }
                  />
                </div>
                <div>
                  <label>Nhập mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "newPassword")
                    }
                  />
                </div>
                <div>
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "conformPassword")
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleChangePassword()}
          >
            Thay đổi
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
  return { logOutSuccess: () => dispatch(logOutSuccess()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
