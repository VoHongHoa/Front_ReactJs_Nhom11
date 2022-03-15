import axios from "../axios";
const handleRegisterUser = (data) => {
  return axios.post("/api/auth/register", data);
};
const handleLoginService = (data) => {
  return axios.post("/api/auth/login", data);
};
// const handlegetUserInfor = (accessToken) => {
//   const AuthStr = "Bearer ".concat(accessToken);
//   //console.log(AuthStr);
//   return axios.get("/api/user/", {
//     headers: { Authorization: AuthStr },
//   });
// };
const handlegetUserInfor = () => {
  return axios.get("/api/user/");
};
const handleEditUser = (data) => {
  return axios.put(`/api/user/:${data.id}`, data);
};
export {
  handleRegisterUser,
  handleLoginService,
  handlegetUserInfor,
  handleEditUser,
};
