export const addUser = (user) => {
  //console.log("check user:", user);
  return async (dispatch, getState) => {
    dispatch(addUserSuccess(user));
  };
};
export const addUserFailded = () => ({
  type: "ADD_USER_FAIDLED",
  user: [],
});
export const addUserSuccess = (user) => ({
  type: "EDIT_USER_SUCCESS",
  user: user,
});
