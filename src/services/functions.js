export const discountCalc = (originalPrice, discountedPrice) => {
  let discount = Math.ceil(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );
  return discount;
};
