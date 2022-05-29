// const formatPrice = (price) => {
//   return price.toLocaleString("it-IT", {
//     style: "currency",
//     currency: "VND",
//   });
// };

const formatPrice = (price) => {
  return `${price} $`;
};
export { formatPrice };
