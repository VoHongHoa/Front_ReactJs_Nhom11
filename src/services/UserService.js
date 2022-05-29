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
const getAlluser = (currentPage) => {
  return axios.get(`/api/user/all?page=${currentPage}`);
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
const countUserByMonth = () => {
  return axios.get("/api/user/status");
};
const forgotPassword = (data) => {
  return axios.post("/api/user/reset-password", data);
};
const changePassword = (data) => {
  return axios.post("/api/user/changepassword", data);
};
const doResetPassword = (data) => {
  return axios.post("/api/user/do-reset-password", data);
};
const findUserByEmail = (email) => {
  return axios.get(`/api/user/find-user-by-email/?email=${email}`);
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
  countUserByMonth,
  forgotPassword,
  changePassword,
  findUserByEmail,
  doResetPassword,
};
