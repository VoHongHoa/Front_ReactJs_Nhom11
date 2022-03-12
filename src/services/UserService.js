import axios from "../axios";
const handleRegisterUser = (data) => {
  return axios.post("/api/auth/register", data);
};
const handleLogin = (data) => {
  return axios.post("/api/auth/login", data);
};
const handlegetUserInfor = (data) => {
  const AuthStr = "Bearer ".concat(data);
  //console.log(AuthStr);
  return axios.get("/api/user/", {
    headers: { Authorization: AuthStr },
  });
};
export { handleRegisterUser, handleLogin, handlegetUserInfor };
