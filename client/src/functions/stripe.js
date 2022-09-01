import axios from 'axios';

export const createPaymentIntent = async (coupon, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { couponApplied: coupon },
    { headers: { authtoken } },
  );
};
