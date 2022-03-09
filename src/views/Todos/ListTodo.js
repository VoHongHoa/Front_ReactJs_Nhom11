import React from "react";
import "./ListTodo.scss";
import AddTodo from "./AddTodo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class ListTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listToDo: [
        { id: "todo1", title: "Doing homework" },
        { id: "todo2", title: "Making video" },
        { id: "todo3", title: "Reading books" },
      ],
      editToDo: {},
      isEdit: false,
    };
  }
  addNew = (toDoChild) => {
    this.setState({
      listToDo: [...this.state.listToDo, toDoChild],
    });
  };
  handleDeleteToDo = (item) => {
    //console.log("check item", item);
    let newListToDo = this.state.listToDo;
    const index = newListToDo.indexOf(item);
    if (index > -1) {
      newListToDo.splice(index, 1); // 2nd parameter means remove one item only
      toast.success("Delete succeed");
    } else {
      toast.error("Delete fail");
    }
    this.setState({
      listToDo: newListToDo,
    });
  };
  handleEditToDoList = (item) => {
    console.log("check item", item);
    this.setState({
      editToDo: item,
      isEdit: true,
    });
  };
  render() {
    let { listToDo, isEdit, editToDo } = this.state;
    return (
      <div className="list-todo-container">
        <AddTodo addNew={this.addNew} />
        <div className="list-todo-content">
          {listToDo &&
            listToDo.length > 0 &&
            listToDo.map((item, index) => {
              return (
                <div className="todo-child" key={item.id}>
                  {isEdit === true ? (
                    <>
                      {editToDo.id === item.id ? (
                        <span>
                          {index + 1} - <input value={editToDo.title} />
                        </span>
                      ) : (
                        <span>
                          {index + 1} - {item.title}
                        </span>
                      )}
                    </>
                  ) : (
                    <span>
                      {index + 1} - {item.title}
                    </span>
                  )}
                  <div className="action-todochild">
                    <button
                      className="edit"
                      onClick={() => this.handleEditToDoList(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => this.handleDeleteToDo(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default ListTodo;
