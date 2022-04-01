import axios from "../axios";
const addNewOder = (data) => {
  return axios.post("/api/order/", data);
};
const getAllOrder = () => {
  return axios.get("/api/order/");
};
export { addNewOder, getAllOrder };
