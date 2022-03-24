import { toast } from "react-toastify";
const initState = {
  cart: [],
  loginInfor: {},
  isLogin: false,
  userInfor: {},
};
const AppReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART_SUCCESS":
      let isAdd = true;
      for (let index = 0; index < state.cart.length; index++) {
        if (state.cart[index]._id === action.item._id) {
          isAdd = false;
          break;
        }
      }
      if (isAdd) {
        state.cart.push(action.item);
        toast.success(
          "Thêm thành công! Bạn có thể thay đổi số lượng ở giỏ hàng!"
        );
      } else {
        toast.error("Sản phẩm đã có trong giỏ hàng!");
      }
      return { ...state };
    case "DELETE_ITEM_SUCCESS":
      let cart = state.cart;
      cart = cart.filter((item) => item.id !== action.itemDelete.id);
      //console.log(state.cart);
      return { ...state, cart };
    case "DELETE_CART":
      console.log(state.cart);
      state.cart = [];
      return { ...state };
    case "LOGIN_SUCCESS":
      state.userInfor = action.userData;
      state.loginInfor = action.loginInfor;
      state.isLogin = true;
      return { ...state };
    case "LOGIN_FAILED":
      state.userData = action.userData;
      state.isLogin = false;
      return { ...state };
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("token");
      state.userInfor = action.userData;
      state.loginInfor = action.loginInfor;
      state.isLogin = false;
      return { ...state };
    case "EDIT_USER_SUCCESS":
      state.userInfor = action.userData;
      return { ...state };
    case "EDIT_USER_FAILED":
      return initState;
    default:
      return state;
  }
};
export default AppReducer;
