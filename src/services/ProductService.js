import axios from "../axios";
const addNewProduct = (data) => {
  return axios.post("/api/product/", data);
};
const getAllProduct = (currentPage) => {
  return axios.get(`/api/product/?page=${currentPage}`);
};
const deleteProduct = (id) => {
  return axios.delete(`/api/product/${id}`);
};
const editProduct = (data) => {
  return axios.put(`/api/product/${data.id}`, data);
};
const findProduct = (keyword) => {
  return axios.get(`/api/product/find?keyword=${keyword}`);
};
const getTopProduct = () => {
  return axios.get("/api/product/get-top-product");
};

const getProductByFilter = (data) => {
  //console.log(data);
  return axios.get(
    `/api/product/get-product-filter?category=${data.category}&filterPrice=${data.filterPrice}&filterRam=${data.filterRam}&filterRom=${data.filterRom}`
  );
};
const getProductRecom = () => {
  return axios.get("/api/product/get-product-recommend");
};
const getProductById = (id) => {
  return axios.get(`/api/product/get-product-by-id?productId=${id}`);
};
export {
  addNewProduct,
  getAllProduct,
  deleteProduct,
  editProduct,
  findProduct,
  getTopProduct,
  getProductByFilter,
  getProductRecom,
  getProductById,
};
