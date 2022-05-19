import axios from "../axios";
const addReviews = (data) => {
  return axios.post(`/api/review/${data.productId}`, data);
};
const getAllReviewProduct = (productId) => {
  return axios.get(`/api/review/${productId}`);
};
const deleteReview = (reviewId) => {
  return axios.delete(`/api/review/${reviewId}`);
};
const editReview = (data) => {
  return axios.put(`/api/review/${data.reviewId}`, data);
};
export { addReviews, getAllReviewProduct, deleteReview, editReview };
