import axios from "../axios";
const handleRegisterUser = (data) => {
  return axios.post("/api/auth/register", data);
};
const handleLoginService = (data) => {
  return axios.post("/api/auth/login", data);
};
const handlegetUserInfor = () => {
  return axios.get("/api/user/");
};
const handleEditUser = (data) => {
  return axios.put(`/api/user/:${data.id}`, data);
};
const getAlluser = () => {
  return axios.get("/api/user/all");
};
export {
  handleRegisterUser,
  handleLoginService,
  handlegetUserInfor,
  handleEditUser,
  getAlluser,
};
