import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect, useDispatch } from "react-redux";
import { addUser } from "../../store/actions/AppAction";
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoChildContent: "",
    };
  }
  // componentDidMount(){
  //   this.props.addUserToRedux()
  // }
  handleOnchangeInput = (event) => {
    this.setState({
      toDoChildContent: event.target.value,
    });
  };
  //   addToDoList = () => {
  //     // console.log(this.state);
  //     let { listToDo } = this.props;
  //     let toDoChild = {
  //       id: Math.floor(Math.random() * 11),
  //       title: this.state.toDoChildContent,
  //     };
  //     listToDo.push(toDoChild);
  //   };
  handleAddNew = (user) => {
    if (user.title && user.title !== "") {
      this.props.addNew(user);
      this.props.addUserToRedux(user);
      toast.success("Wow so easy!");
      this.setState({
        toDoChildContent: "",
      });
    } else {
      toast.error("Don'n easy!");
    }
  };
  render() {
    let user = {
      id: Math.floor(Math.random() * 11),
      title: this.state.toDoChildContent,
      quantity: 1,
    };
    return (
      <div className="add-todo">
        <input
          type="text"
          value={this.state.toDoChildContent}
          onChange={(event) => {
            this.handleOnchangeInput(event);
          }}
        />
        <button type="button" onClick={() => this.handleAddNew(user)}>
          Add
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { dataRedux: state.users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUserToRedux: (user) => dispatch(addUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
