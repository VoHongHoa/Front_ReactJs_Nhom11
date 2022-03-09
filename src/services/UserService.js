import axios from "../axios";
const handleRegisterUser = (data) => {
  return axios.post("/register", data);
};
export { handleRegisterUser };
