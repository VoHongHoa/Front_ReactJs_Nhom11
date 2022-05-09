const initState = {
  products: [],
};
const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH_PRODUCTS_SUCCESS":
      state.products = action.products;
      return { ...state };
    case "SEARCH_PRODUCTS_FAILED":
      return initState;
    default:
      return state;
  }
};
export default productsReducer;
