import axios from "axios";
const REACT_APP_API = process.env.REACT_APP_API;

export const createPaymentIntent = async (coupon, authtoken) => {
  return await axios.post(
    `${REACT_APP_API}/create-payment-intent`,
    { couponApplied: coupon },
    { headers: { authtoken } }
  );
};
