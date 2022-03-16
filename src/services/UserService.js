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
  return axios.put(`/api/user/${data.id}`, data);
};
const getAlluser = () => {
  return axios.get("/api/user/all");
};
const deleteuser = (userId) => {
  return axios.delete(`/api/user/${userId}`);
};
const editUserFromAdmin = (data) => {
  return axios.put(`/api/user/all/${data.id}`, data);
};
const findUser = (data) => {
  return axios.get(`/api/user/find-user/?keyword=${data}`);
};
const countUser = () => {
  return axios.get("/api/user/stats");
};
export {
  handleRegisterUser,
  handleLoginService,
  handlegetUserInfor,
  handleEditUser,
  getAlluser,
  deleteuser,
  editUserFromAdmin,
  findUser,
  countUser,
};
