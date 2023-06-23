import axios from "axios";
const REACT_APP_API = process.env.REACT_APP_API;

export const getCoupons = async () =>
  await axios.get(`${REACT_APP_API}/coupons`);
export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${REACT_APP_API}/coupon/${couponId}`, {
    headers: { authtoken },
  });
export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${REACT_APP_API}/coupon`,
    { coupon },
    { headers: { authtoken } }
  );
