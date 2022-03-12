import { toast } from "react-toastify";
const initState = {
  users: [],
  post: [],
  cart: [],
  userInfor: {},
  isLogin: false,
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
    case "ADD_TO_CART_SUCCESS":
      let isAdd = true;
      for (let index = 0; index < state.cart.length; index++) {
        if (state.cart[index].id === action.item.id) {
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

      //console.log(state.cart);
      return { ...state };
    case "DELETE_ITEM_SUCCESS":
      let cart = state.cart;
      cart = cart.filter((item) => item.id !== action.itemDelete.id);
      //console.log(state.cart);
      return { ...state, cart };
    case "DELETE_CART":
      state.cart = [];
      return { ...state };
    case "LOGIN_SUCCESS":
      state.userInfor = action.userInfor;
      state.isLogin = true;
      return { ...state };
    default:
      return state;
  }
};
export default rootReducer;
