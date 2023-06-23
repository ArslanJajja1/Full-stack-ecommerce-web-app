import axios from "axios";
const REACT_APP_API = process.env.REACT_APP_API;
export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${REACT_APP_API}/user/cart`,
    { cart },
    { headers: { authtoken } }
  );
export const getUserCart = async (authtoken) =>
  await axios.get(`${REACT_APP_API}/user/cart`, {
    headers: { authtoken },
  });
export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${REACT_APP_API}/user/cart`, {
    headers: { authtoken },
  });
export const saveUserAddress = async (address, authtoken) =>
  await axios.post(
    `${REACT_APP_API}/user/address`,
    { address },
    { headers: { authtoken } }
  );
export const applyCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${REACT_APP_API}/user/cart/coupon`,
    { coupon },
    { headers: { authtoken } }
  );
export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${REACT_APP_API}/user/order`,
    { stripeResponse },
    { headers: { authtoken } }
  );
export const getUserOrders = async (authtoken) =>
  await axios.get(`${REACT_APP_API}/user/orders`, {
    headers: { authtoken },
  });
export const getWishlist = async (authtoken) =>
  await axios.get(`${REACT_APP_API}/user/wishlist`, {
    headers: { authtoken },
  });
export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: { authtoken },
    }
  );
export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: { authtoken },
    }
  );
export const createCashOrderForUser = async (authtoken, COD, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { COD, couponApplied: coupon },
    { headers: { authtoken } }
  );
