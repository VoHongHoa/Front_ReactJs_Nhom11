import axios from "../axios";
const addNewOder = (data) => {
  return axios.post("/api/order/", data);
};
const getAllOrder = () => {
  return axios.get("/api/order/");
};
const countOrderByMonth = () => {
  return axios.get("/api/order/income");
};
const deleteOrder = (item) => {
  return axios.delete(`/api/order/${item._id}`);
};
export { addNewOder, getAllOrder, deleteOrder, countOrderByMonth };
