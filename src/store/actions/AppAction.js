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

export const addToCart = (item) => {
  //console.log("check user:", user);
  return async (dispatch, getState) => {
    item.quantity = 1;
    dispatch(addToCartSuccess(item));
  };
};
export const addToCartFailded = () => ({
  type: "ADD_TO_CART_FAILED",
  item: [],
});
export const addToCartSuccess = (item) => ({
  type: "ADD_TO_CART_SUCCESS",
  item: item,
});

export const deleteItem = (item) => {
  return async (dispatch, getState) => {
    dispatch(deleteItemSuccess(item));
  };
};
export const deleteItemFailded = () => ({
  type: "DELETE_ITEM_FAILED",
  itemDelete: [],
});
export const deleteItemSuccess = (item) => ({
  type: "DELETE_ITEM_SUCCESS",
  itemDelete: item,
});

export const deleteCart = () => ({
  type: "DELETE_CART",
});

export const handleSaveUserInforRedux = (userInfor) => {
  //console.log("check user:", userInfor);

  return async (dispatch, getState) => {
    dispatch(loginSuccess(userInfor));
  };
};
export const loginSuccess = (userInfor) => ({
  type: "LOGIN_SUCCESS",
  userInfor: userInfor,
});
