import axios from "../axios";
const addNewProduct = (data) => {
  return axios.post("/api/product/", data);
};
const getAllProduct = () => {
  return axios.get("/api/product/");
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
export {
  addNewProduct,
  getAllProduct,
  deleteProduct,
  editProduct,
  findProduct,
  getTopProduct,
};
