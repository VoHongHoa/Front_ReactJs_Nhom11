const initState = {
  products: [],
  allProduct: [],
};
const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH_PRODUCTS_SUCCESS":
      state.products = action.products;
      return { ...state };
    case "SEARCH_PRODUCTS_FAILED":
      return initState;
    case "GET_ALL_PRODUCTS_SUCCESS":
      state.allProduct = action.products;
    case "GET_ALL_PRODUCTS_FAILED":
      return initState;
    default:
      return state;
  }
};
export default productsReducer;
