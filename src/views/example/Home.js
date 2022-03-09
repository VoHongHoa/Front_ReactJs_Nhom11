import React from "react";
import { connect, useDispatch } from "react-redux";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      total: "",
      quantity: 0,
    };
  }
  componentDidMount() {
    this.setState({
      listUser: this.props.dataRedux,
    });
  }
  // componentDidUpdate(prevProps) {
  //   console.log("check componentdidupdate:", this.props.dataRedux);
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //   console.log(prevProps.dataRedux);
  //   if (this.props.dataRedux !== prevProps.dataRedux) {
  //     this.setState({
  //       listUser: this.props.dataRedux,
  //     });
  //   }
  // }
  handleDeleteToDo = (item) => {
    //console.log("check item", item);
    this.props.deleteUserRedux(item);
    this.setState({
      listUser: this.props.dataRedux,
      quantity: 0,
    });
  };
  handleOnchangeInput = (event) => {
    this.setState({
      quantity: event.target.value,
    });
  };
  render() {
    //console.log("check props: ", this.props);
    let { listUser, total } = this.state;
    total = 0;
    // let listUser = this.props.dataRedux;
    return (
      <>
        {listUser &&
          listUser.length > 0 &&
          listUser.map((item, index) => {
            total = total + +item.title;
            return (
              <>
                <p>{item.title}</p>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={item.quantity}
                  onChange={(event) => this.handleOnchangeInput(event)}
                />
                <button
                  className="delete"
                  onClick={() => this.handleDeleteToDo(item)}
                >
                  Delete
                </button>
              </>
            );
          })}
        <span>sum: {total}</span>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { dataRedux: state.users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserRedux: (userDelete) =>
      dispatch({ type: "DELETE_USER", payload: userDelete }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
