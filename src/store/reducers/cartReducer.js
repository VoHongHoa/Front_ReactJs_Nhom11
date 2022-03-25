import { toast } from "react-toastify";
const initState = {
  cart: [],
};
const cartReducer = (state = initState, action) => {
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
      cart = cart.filter((item) => item._id !== action.itemDelete._id);
      //console.log(state.cart);
      return { ...state, cart };
    case "DELETE_CART":
      console.log(state.cart);
      state.cart = [];
      return { ...state };
    default:
      return state;
  }
};
export default cartReducer;
