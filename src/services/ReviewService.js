import axios from "../axios";
const addReviews = (data) => {
  return axios.post("/api/review", data);
};
const getAllReviewProduct = (productId) => {
  return axios.get(`/api/review/${productId}`);
};
export { addReviews, getAllReviewProduct };