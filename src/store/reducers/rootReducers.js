const initState = {
  users: [],
  post: [],
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_USER":
      //console.log("dhsakjfhdsjkf", action);
      let user = state.users;
      const index = user.indexOf(action.payload);
      if (index > -1) {
        user.splice(index, 1); // 2nd parameter means remove one item only
      }
      console.log("check state redux:", state);
      return { ...state };
    case "EDIT_USER_SUCCESS":
      console.log(action);
      state.users.push(action.user);
      return { ...state };
    default:
      return state;
  }
};
export default rootReducer;
